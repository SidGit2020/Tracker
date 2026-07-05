using Microsoft.EntityFrameworkCore;
using Tracker.Server.Categories;
using Tracker.Server.Entries;

namespace Tracker.Server.Data;

public class TrackerDbContext(DbContextOptions<TrackerDbContext> options) : DbContext(options)
{
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Entry> Entries => Set<Entry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>()
            .HasMany<Entry>()
            .WithOne(e => e.Category)
            .HasForeignKey(e => e.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Category>()
            .Property(c => c.Name)
            .UseCollation("NOCASE");

        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique();

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Food", IsPreset = true },
            new Category { Id = 2, Name = "Transport", IsPreset = true },
            new Category { Id = 3, Name = "Shopping", IsPreset = true },
            new Category { Id = 4, Name = "Other", IsPreset = true }
        );
    }
}
