using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Tracker.Server.Categories;
using Tracker.Server.Data;
using Tracker.Server.Entries;
using Xunit;

namespace Tracker.Server.Tests;

public class EntriesEndpointsTests : IDisposable
{
    private readonly TrackerWebApplicationFactory _factory;
    private readonly HttpClient _client;

    public EntriesEndpointsTests()
    {
        _factory = new TrackerWebApplicationFactory();
        _client = _factory.CreateClient();
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    private async Task<T> WithDbAsync<T>(Func<TrackerDbContext, Task<T>> action)
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<TrackerDbContext>();
        return await action(db);
    }

    [Fact]
    public async Task Create_PresetCategoryName_MatchesExistingCategory()
    {
        var response = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(150m, "Food"));

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var created = await response.Content.ReadFromJsonAsync<EntryResponse>();
        Assert.NotNull(created);
        Assert.Equal("Food", created!.Category.Name);

        var foodCategoryCount = await WithDbAsync(db => db.Categories.CountAsync(c => c.Name == "Food"));
        Assert.Equal(1, foodCategoryCount);
    }

    [Fact]
    public async Task Create_NewCustomCategoryName_CreatesNewCategory()
    {
        var response = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(42m, "Books"));

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var created = await response.Content.ReadFromJsonAsync<EntryResponse>();
        Assert.Equal("Books", created!.Category.Name);

        var booksCategory = await WithDbAsync(db => db.Categories.SingleAsync(c => c.Name == "Books"));
        Assert.False(booksCategory.IsPreset);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-10)]
    public async Task Create_InvalidAmount_Returns400(decimal amount)
    {
        var response = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(amount, "Food"));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var problem = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();
        Assert.NotNull(problem);
    }

    [Fact]
    public async Task Create_EmptyCategoryName_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(10m, ""));

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Create_SetsCreatedAtServerSide()
    {
        var before = DateTimeOffset.UtcNow;
        var response = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(10m, "Food"));
        var after = DateTimeOffset.UtcNow;

        var created = await response.Content.ReadFromJsonAsync<EntryResponse>();
        Assert.InRange(created!.CreatedAt, before.AddSeconds(-1), after.AddSeconds(1));
    }

    [Fact]
    public async Task Get_ReturnsOnlyCurrentMonthEntries_OrderedNewestFirst()
    {
        var now = DateTimeOffset.UtcNow;

        await WithDbAsync(async db =>
        {
            var food = await db.Categories.SingleAsync(c => c.Name == "Food");
            db.Entries.AddRange(
                new Entry { Amount = 1m, CategoryId = food.Id, CreatedAt = now.AddMonths(-1) },
                new Entry { Amount = 2m, CategoryId = food.Id, CreatedAt = now.AddMinutes(-10) },
                new Entry { Amount = 3m, CategoryId = food.Id, CreatedAt = now.AddMinutes(-5) }
            );
            await db.SaveChangesAsync();
            return 0;
        });

        var response = await _client.GetAsync("/api/entries");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var entries = await response.Content.ReadFromJsonAsync<List<EntryResponse>>();
        Assert.NotNull(entries);
        Assert.Equal(2, entries!.Count);
        Assert.Equal(3m, entries[0].Amount);
        Assert.Equal(2m, entries[1].Amount);
    }

    [Fact]
    public async Task Update_ChangesAmountAndCategory_LeavesCreatedAtUntouched()
    {
        var createResponse = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(10m, "Food"));
        var created = await createResponse.Content.ReadFromJsonAsync<EntryResponse>();

        var updateResponse = await _client.PutAsJsonAsync(
            $"/api/entries/{created!.Id}", new EntryRequest(25m, "Transport"));

        Assert.Equal(HttpStatusCode.OK, updateResponse.StatusCode);
        var updated = await updateResponse.Content.ReadFromJsonAsync<EntryResponse>();
        Assert.Equal(25m, updated!.Amount);
        Assert.Equal("Transport", updated.Category.Name);
        Assert.Equal(created.CreatedAt, updated.CreatedAt);
    }

    [Fact]
    public async Task Update_UnknownId_Returns404()
    {
        var response = await _client.PutAsJsonAsync("/api/entries/9999", new EntryRequest(10m, "Food"));

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Delete_ExistingEntry_Returns204AndHardDeletes()
    {
        var createResponse = await _client.PostAsJsonAsync("/api/entries", new EntryRequest(10m, "Food"));
        var created = await createResponse.Content.ReadFromJsonAsync<EntryResponse>();

        var deleteResponse = await _client.DeleteAsync($"/api/entries/{created!.Id}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        var remaining = await WithDbAsync(db => db.Entries.CountAsync(e => e.Id == created.Id));
        Assert.Equal(0, remaining);
    }

    [Fact]
    public async Task Delete_UnknownId_Returns404()
    {
        var response = await _client.DeleteAsync("/api/entries/9999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
