using Microsoft.EntityFrameworkCore;
using Tracker.Server.Categories;
using Tracker.Server.Data;

namespace Tracker.Server.Entries;

public static class EntriesEndpoints
{
    public static void MapEntriesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/entries");

        group.MapPost("/", CreateEntry);
        group.MapGet("/", GetEntries);
        group.MapPut("/{id:int}", UpdateEntry);
        group.MapDelete("/{id:int}", DeleteEntry);
    }

    private static IResult? ValidateRequest(EntryRequest request)
    {
        if (request.Amount <= 0)
        {
            return Results.Problem(
                title: "Invalid amount.",
                detail: "Amount must be greater than 0.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        if (string.IsNullOrWhiteSpace(request.CategoryName))
        {
            return Results.Problem(
                title: "Invalid category.",
                detail: "Category name must not be empty.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        return null;
    }

    private static EntryResponse ToResponse(Entry entry) =>
        new(entry.Id, entry.Amount, new CategoryDto(entry.Category.Id, entry.Category.Name), entry.CreatedAt);

    private static async Task<IResult> CreateEntry(EntryRequest request, TrackerDbContext db)
    {
        var validationError = ValidateRequest(request);
        if (validationError is not null)
        {
            return validationError;
        }

        var category = await CategoryMatcher.MatchOrCreateAsync(db, request.CategoryName);

        var entry = new Entry
        {
            Amount = request.Amount,
            CategoryId = category.Id,
            CreatedAt = DateTimeOffset.UtcNow,
        };

        db.Entries.Add(entry);
        await db.SaveChangesAsync();

        entry.Category = category;

        return Results.Created($"/api/entries/{entry.Id}", ToResponse(entry));
    }

    private static async Task<IResult> GetEntries(TrackerDbContext db)
    {
        var now = DateTimeOffset.Now;
        var localMonthStart = new DateTimeOffset(now.Year, now.Month, 1, 0, 0, 0, now.Offset);
        var localMonthEnd = localMonthStart.AddMonths(1);
        var utcLowerBound = localMonthStart.ToUniversalTime();
        var utcUpperBound = localMonthEnd.ToUniversalTime();

        var allEntries = await db.Entries.Include(e => e.Category).ToListAsync();

        var ordered = allEntries
            .Where(e => e.CreatedAt >= utcLowerBound && e.CreatedAt < utcUpperBound)
            .OrderByDescending(e => e.CreatedAt)
            .Select(ToResponse);

        return Results.Ok(ordered);
    }

    private static async Task<IResult> UpdateEntry(int id, EntryRequest request, TrackerDbContext db)
    {
        var validationError = ValidateRequest(request);
        if (validationError is not null)
        {
            return validationError;
        }

        var entry = await db.Entries.Include(e => e.Category).FirstOrDefaultAsync(e => e.Id == id);
        if (entry is null)
        {
            return Results.Problem(
                title: "Entry not found.",
                detail: $"No entry exists with id {id}.",
                statusCode: StatusCodes.Status404NotFound);
        }

        var category = await CategoryMatcher.MatchOrCreateAsync(db, request.CategoryName);

        entry.Amount = request.Amount;
        entry.CategoryId = category.Id;
        entry.Category = category;

        await db.SaveChangesAsync();

        return Results.Ok(ToResponse(entry));
    }

    private static async Task<IResult> DeleteEntry(int id, TrackerDbContext db)
    {
        var entry = await db.Entries.FirstOrDefaultAsync(e => e.Id == id);
        if (entry is null)
        {
            return Results.Problem(
                title: "Entry not found.",
                detail: $"No entry exists with id {id}.",
                statusCode: StatusCodes.Status404NotFound);
        }

        db.Entries.Remove(entry);
        await db.SaveChangesAsync();

        return Results.NoContent();
    }
}
