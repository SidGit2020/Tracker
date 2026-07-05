using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Tracker.Server.Data;
using Tracker.Server.Entries;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TrackerDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TrackerDb")));
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler(exceptionApp => exceptionApp.Run(async context =>
{
    await Results.Problem(statusCode: StatusCodes.Status500InternalServerError).ExecuteAsync(context);
}));
app.UseStatusCodePages();

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

app.MapEntriesEndpoints();

// Angular's application builder emits the browser bundle into wwwroot/browser (not wwwroot itself).
var clientBuildPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot", "browser");
if (Directory.Exists(clientBuildPath))
{
    var clientFileProvider = new PhysicalFileProvider(clientBuildPath);
    app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = clientFileProvider });
    app.UseStaticFiles(new StaticFileOptions { FileProvider = clientFileProvider });
    app.MapFallbackToFile("index.html", new StaticFileOptions { FileProvider = clientFileProvider });
}

app.Run();

public partial class Program;
