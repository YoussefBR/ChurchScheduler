var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();

// builder.Services.AddCors(options =>
// {
//     // AllowAnyOrigin is temporary and will be replaced with the origin of our frontend once that is set up
//     // options.AddPolicy("AllowAll", builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// });
// builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Swagger stuff for viewing API if we need it
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
//     {
//         options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
//         options.RoutePrefix = string.Empty;
//     });
// }

// app.UseCors("AllowAll");

app.MapControllers();
app.UseHttpsRedirection();

app.Run();