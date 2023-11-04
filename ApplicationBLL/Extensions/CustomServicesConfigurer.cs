using System.Reflection;
using ApplicationBLL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ApplicationBLL.Extensions;

public static class CustomServicesConfigurer
{
    public static void ConfigureCustomServices(this IServiceCollection serviceProvider)
    {
        serviceProvider.AddScoped<EmailValidatorService>();
        serviceProvider.AddScoped<AuthService>();
        serviceProvider.AddScoped<UserService>();
    }

    public static void AddAutoMapperProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }
}