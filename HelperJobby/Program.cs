using System.Text;
using ApplicationDAL.Context;
using HelperJobby.Extensions;
using HelperJobby.Hubs;
using HelperJobby.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.ConfigureCustomServices();
builder.Services.AddAutoMapperProfiles();
builder.Services.AddSignalR();


var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<ApplicationContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore
    );

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateAudience = false,
        ValidateIssuer = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"]!))
    };
    
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/Chat"))
            {
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddCors(options => options.AddPolicy("Frontend",
    policy =>
    {
        policy.WithOrigins().WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("Frontend");
app.UseAuthorization();
app.UseMiddleware<CurrentUserIdSetterMiddleware>();
app.UseMiddleware<ExceptionsHandlingMiddleware>();

app.MapControllerRoute(
    "default",
    "{controller}/{action=Index}/{id?}");
app.MapHub<ChatHub>("/Chat");

app.MapFallbackToFile("index.html");

app.Run();