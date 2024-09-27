using ChurchScheduler.Security;
using CSBackend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);
Console.WriteLine($"Host: {builder.Host}");

// Configure DbContext with PostgreSQL
Console.WriteLine($"Connection String: {builder.Configuration.GetConnectionString("DefaultConnection")}");
builder.Services.AddDbContext<ChurchSchedulerContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.Authority = builder.Configuration["AzureAdB2C:Authority"];
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = builder.Configuration["AzureAdB2C:Issuer"],
                ValidAudience = builder.Configuration["AzureAdB2C:Audience"]
            };
        })
        .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.WithOrigins("http://localhost:3000") // Your frontend URL
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

var app = builder.Build();

// Ensure seeding of the database
//SeedDatabase(app);

// Configure the HTTP request pipeline
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// app.UseEndpoints(endpoints =>
// {
//     _ = endpoints.MapControllers(); // This will map all your controller routes
// });

app.MapControllers();
app.Run();

// void SeedDatabase(IHost app)
// {
//     using var scope = app.Services.CreateScope();
//     var context = scope.ServiceProvider.GetRequiredService<ChurchSchedulerContext>();
//     var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>(); // Replace with your actual class name
    
//     try
//     {
//         context.Database.CanConnect(); // Returns true if it can connect
//         Console.WriteLine("Connection to the PostgreSQL database was successful.");
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"Error connecting to the database: {ex.Message}");
//     }

//     // Ensure the database is created and updated
//     context.Database.Migrate();

//     // Seed initial data if no Abouna exists

//     if (!context.Abounas.Any(a => a.Username == "frdanialzaki"))

//     if (!context.Abounas.Any(a => a.Username == "frnardineshak"))

//     {
//         logger.LogInformation("Seeding the database with initial Abouna data.");
//         string salt = PasswordHasher.CreateSalt(); // Create salt
//         var abouna = new Abouna
//         {

//             AbounaId = "3",
//             FirstName = "Fr. Danial",
//             LastName = "Zaki",
//             Username = "frdanialzaki",
//             Password = PasswordHasher.Hash("ilovejesus", salt), // Replace with your secure password
//             PasswordSalt = salt,
//             Email = "frdanialn@gmail.com", // Replace with the email you want
//             Availability = ""
//         };

//         context.Abounas.Add(abouna);
//         try
//         {
//             context.SaveChanges(); // Save to the database
//         }
//         catch (Exception ex)
//         {
//             logger.LogError(ex, "An error occurred while saving Abouna to the database.");
//         }


//             AbounaId = "2",
//             FirstName = "Fr.Nardin",
//             LastName = "Eshak",
//             Username = "frnardineshak",
//             Password = PasswordHasher.Hash("ilovejesus", salt), // Replace with your secure password
//             PasswordSalt = salt,
//             Email = "frnardin@gmail.com", // Replace with the email you want
//             Availability = ""
//         };

//         context.Abounas.Add(abouna);
//         try
//         {
//             context.SaveChanges(); // Save to the database
//         }
//         catch (Exception ex)
//         {
//             logger.LogError(ex, "An error occurred while saving Abouna to the database.");
//         }


//         logger.LogInformation("Abouna added to the database: {Abouna}", abouna);
//     }
//     else
//     {
//         logger.LogInformation("Abouna already exists in the database.");
//     }

// }

//}

