using Microsoft.EntityFrameworkCore;
using Tracker.Server.Data;

namespace Tracker.Server.Categories;

public static class CategoryMatcher
{
    public static async Task<Category> MatchOrCreateAsync(TrackerDbContext db, string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Category name must not be null or whitespace.", nameof(name));
        }

        var trimmedName = name.Trim();

        var existing = await db.Categories
            .FirstOrDefaultAsync(c => c.Name.ToLower() == trimmedName.ToLower());

        if (existing is not null)
        {
            return existing;
        }

        var created = new Category { Name = trimmedName, IsPreset = false };
        db.Categories.Add(created);

        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            // Another request created a matching category concurrently (unique index violation) — reuse it.
            db.Entry(created).State = EntityState.Detached;

            var raceWinner = await db.Categories
                .FirstOrDefaultAsync(c => c.Name.ToLower() == trimmedName.ToLower());

            if (raceWinner is null)
            {
                throw;
            }

            return raceWinner;
        }

        return created;
    }
}
