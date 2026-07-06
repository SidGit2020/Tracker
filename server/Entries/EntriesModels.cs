namespace Tracker.Server.Entries;

public record EntryRequest(decimal Amount, string CategoryName);

public record CategoryDto(int Id, string Name);

public record EntryResponse(int Id, decimal Amount, CategoryDto Category, DateTimeOffset CreatedAt);

public record CategoryTotalDto(CategoryDto Category, decimal Amount);

public record MonthlySummaryResponse(
    int Year,
    int Month,
    decimal TotalAmount,
    IReadOnlyList<CategoryTotalDto> Categories,
    int EarliestYear,
    int EarliestMonth);
