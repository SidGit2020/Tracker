using Tracker.Server.Categories;

namespace Tracker.Server.Entries;

public class Entry
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }
}
