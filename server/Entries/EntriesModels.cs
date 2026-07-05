namespace Tracker.Server.Entries;

public record EntryRequest(decimal Amount, string CategoryName);

public record CategoryDto(int Id, string Name);

public record EntryResponse(int Id, decimal Amount, CategoryDto Category, DateTimeOffset CreatedAt);
