using Microsoft.EntityFrameworkCore;
using Tracker.Server.Data;

namespace Tracker.Server.Categories;

public static class CategoryMatcher
{
    public static async Task<Category> MatchOrCreateAsync(TrackerDbContext db, string name)
    {
        var existing = await db.Categories
            .FirstOrDefaultAsync(c => c.Name.ToLower() == name.ToLower());

        if (existing is not null)
        {
            return existing;
        }

        var created = new Category { Name = name, IsPreset = false };
        db.Categories.Add(created);
        await db.SaveChangesAsync();
        return created;
    }
}
