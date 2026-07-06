using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Tracker.Server.Categories;
using Tracker.Server.Data;
using Tracker.Server.Entries;
using Xunit;

namespace Tracker.Server.Tests;

public class MonthlySummaryEndpointTests : IDisposable
{
    private readonly TrackerWebApplicationFactory _factory;
    private readonly HttpClient _client;

    public MonthlySummaryEndpointTests()
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
    public async Task Get_NoParams_ReturnsCurrentMonthSummaryOrderedLargestFirst()
    {
        var now = DateTimeOffset.UtcNow;

        await WithDbAsync(async db =>
        {
            var food = await db.Categories.SingleAsync(c => c.Name == "Food");
            var transport = await db.Categories.SingleAsync(c => c.Name == "Transport");
            db.Entries.AddRange(
                new Entry { Amount = 100m, CategoryId = food.Id, CreatedAt = now.AddMinutes(-10) },
                new Entry { Amount = 50m, CategoryId = food.Id, CreatedAt = now.AddMinutes(-5) },
                new Entry { Amount = 30m, CategoryId = transport.Id, CreatedAt = now.AddMinutes(-2) },
                new Entry { Amount = 999m, CategoryId = food.Id, CreatedAt = now.AddMonths(-2) }
            );
            await db.SaveChangesAsync();
            return 0;
        });

        var response = await _client.GetAsync("/api/entries/monthly-summary");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var summary = await response.Content.ReadFromJsonAsync<MonthlySummaryResponse>();
        Assert.NotNull(summary);

        var localNow = now.ToLocalTime();
        Assert.Equal(localNow.Year, summary!.Year);
        Assert.Equal(localNow.Month, summary.Month);
        Assert.Equal(180m, summary.TotalAmount);
        Assert.Equal(2, summary.Categories.Count);
        Assert.Equal("Food", summary.Categories[0].Category.Name);
        Assert.Equal(150m, summary.Categories[0].Amount);
        Assert.Equal("Transport", summary.Categories[1].Category.Name);
        Assert.Equal(30m, summary.Categories[1].Amount);
    }

    [Fact]
    public async Task Get_ExplicitPastMonth_ReturnsThatMonthSummary()
    {
        var pastLocal = DateTimeOffset.Now.AddMonths(-2);
        var pastInstant = pastLocal.ToUniversalTime();

        await WithDbAsync(async db =>
        {
            var food = await db.Categories.SingleAsync(c => c.Name == "Food");
            db.Entries.Add(new Entry { Amount = 75m, CategoryId = food.Id, CreatedAt = pastInstant });
            await db.SaveChangesAsync();
            return 0;
        });

        var response = await _client.GetAsync(
            $"/api/entries/monthly-summary?year={pastLocal.Year}&month={pastLocal.Month}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var summary = await response.Content.ReadFromJsonAsync<MonthlySummaryResponse>();
        Assert.NotNull(summary);
        Assert.Equal(pastLocal.Year, summary!.Year);
        Assert.Equal(pastLocal.Month, summary.Month);
        Assert.Equal(75m, summary.TotalAmount);
        Assert.Single(summary.Categories);
        Assert.Equal("Food", summary.Categories[0].Category.Name);
    }

    [Fact]
    public async Task Get_MonthWithNoEntries_ReturnsEmptyCategoriesAndZeroTotal()
    {
        var now = DateTimeOffset.UtcNow;

        await WithDbAsync(async db =>
        {
            var food = await db.Categories.SingleAsync(c => c.Name == "Food");
            db.Entries.Add(new Entry { Amount = 20m, CategoryId = food.Id, CreatedAt = now.AddMonths(-3) });
            await db.SaveChangesAsync();
            return 0;
        });

        var targetLocal = DateTimeOffset.Now.AddMonths(-1);
        var response = await _client.GetAsync(
            $"/api/entries/monthly-summary?year={targetLocal.Year}&month={targetLocal.Month}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var summary = await response.Content.ReadFromJsonAsync<MonthlySummaryResponse>();
        Assert.NotNull(summary);
        Assert.Equal(0m, summary!.TotalAmount);
        Assert.Empty(summary.Categories);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(13)]
    public async Task Get_InvalidMonth_Returns400(int month)
    {
        var now = DateTimeOffset.Now;
        var response = await _client.GetAsync($"/api/entries/monthly-summary?year={now.Year}&month={month}");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        var problem = await response.Content.ReadFromJsonAsync<Dictionary<string, object>>();
        Assert.NotNull(problem);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task Get_InvalidYear_Returns400(int year)
    {
        var response = await _client.GetAsync($"/api/entries/monthly-summary?year={year}&month=1");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Get_OnlyYearSupplied_Returns400()
    {
        var response = await _client.GetAsync("/api/entries/monthly-summary?year=2026");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Get_OnlyMonthSupplied_Returns400()
    {
        var response = await _client.GetAsync("/api/entries/monthly-summary?month=5");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Get_FutureMonth_Returns400()
    {
        var future = DateTimeOffset.Now.AddMonths(1);
        var response = await _client.GetAsync(
            $"/api/entries/monthly-summary?year={future.Year}&month={future.Month}");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Get_EarliestMonth_DerivedFromMinCreatedAtAcrossAllEntries()
    {
        var now = DateTimeOffset.UtcNow;
        var earliestInstant = now.AddMonths(-6);

        await WithDbAsync(async db =>
        {
            var food = await db.Categories.SingleAsync(c => c.Name == "Food");
            db.Entries.AddRange(
                new Entry { Amount = 10m, CategoryId = food.Id, CreatedAt = earliestInstant },
                new Entry { Amount = 20m, CategoryId = food.Id, CreatedAt = now.AddMonths(-1) },
                new Entry { Amount = 30m, CategoryId = food.Id, CreatedAt = now }
            );
            await db.SaveChangesAsync();
            return 0;
        });

        var response = await _client.GetAsync("/api/entries/monthly-summary");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var summary = await response.Content.ReadFromJsonAsync<MonthlySummaryResponse>();
        Assert.NotNull(summary);

        var expectedEarliestLocal = earliestInstant.ToLocalTime();
        Assert.Equal(expectedEarliestLocal.Year, summary!.EarliestYear);
        Assert.Equal(expectedEarliestLocal.Month, summary.EarliestMonth);
    }

    [Fact]
    public async Task Get_NoEntriesAtAll_EarliestMonthEqualsCurrentMonth()
    {
        var response = await _client.GetAsync("/api/entries/monthly-summary");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var summary = await response.Content.ReadFromJsonAsync<MonthlySummaryResponse>();
        Assert.NotNull(summary);

        var nowLocal = DateTimeOffset.Now;
        Assert.Equal(nowLocal.Year, summary!.EarliestYear);
        Assert.Equal(nowLocal.Month, summary.EarliestMonth);
        Assert.Equal(0m, summary.TotalAmount);
        Assert.Empty(summary.Categories);
    }
}
