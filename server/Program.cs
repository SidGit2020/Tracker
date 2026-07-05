using Microsoft.EntityFrameworkCore;
using Tracker.Server.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TrackerDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TrackerDb")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TrackerDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        logger.LogCritical(ex, "Database migration failed on startup.");
        throw;
    }
}

app.Run();
