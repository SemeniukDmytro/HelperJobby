using System.Text;
using ApplicationBLL.Extensions;
using ApplicationDAL.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.ConfigureCustomServices();
builder.Services.AddAutoMapperProfiles();


var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"]!))
    };
});

builder.Services.AddCors(options => options.AddPolicy("Frontend", policy =>
{
    policy.WithOrigins().WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("Frontend");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();