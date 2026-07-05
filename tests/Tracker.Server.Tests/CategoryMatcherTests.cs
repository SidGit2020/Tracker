using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Tracker.Server.Categories;
using Tracker.Server.Data;
using Xunit;

namespace Tracker.Server.Tests;

public class CategoryMatcherTests : IDisposable
{
    private readonly SqliteConnection _connection;
    private readonly TrackerDbContext _db;

    public CategoryMatcherTests()
    {
        _connection = new SqliteConnection("Data Source=:memory:");
        _connection.Open();

        var options = new DbContextOptionsBuilder<TrackerDbContext>()
            .UseSqlite(_connection)
            .Options;

        _db = new TrackerDbContext(options);
        _db.Database.EnsureCreated();
    }

    public void Dispose()
    {
        _db.Dispose();
        _connection.Dispose();
    }

    [Fact]
    public async Task MatchOrCreateAsync_ExactMatch_ReturnsExistingCategory()
    {
        var food = _db.Categories.Single(c => c.Name == "Food");

        var result = await CategoryMatcher.MatchOrCreateAsync(_db, "Food");

        Assert.Equal(food.Id, result.Id);
        Assert.Single(_db.Categories.Where(c => c.Name == "Food"));
    }

    [Fact]
    public async Task MatchOrCreateAsync_CaseInsensitiveMatch_ReturnsExistingCategory()
    {
        var food = _db.Categories.Single(c => c.Name == "Food");

        var result = await CategoryMatcher.MatchOrCreateAsync(_db, "food");

        Assert.Equal(food.Id, result.Id);
        Assert.Equal("Food", result.Name);
    }

    [Fact]
    public async Task MatchOrCreateAsync_NoMatch_CreatesNewCategory()
    {
        var result = await CategoryMatcher.MatchOrCreateAsync(_db, "Entertainment");

        Assert.NotEqual(0, result.Id);
        Assert.Equal("Entertainment", result.Name);
        Assert.Single(_db.Categories.Where(c => c.Name == "Entertainment"));
    }

    [Fact]
    public async Task MatchOrCreateAsync_CreatedCategory_DefaultsIsPresetFalse()
    {
        var result = await CategoryMatcher.MatchOrCreateAsync(_db, "Entertainment");

        Assert.False(result.IsPreset);
    }
}
