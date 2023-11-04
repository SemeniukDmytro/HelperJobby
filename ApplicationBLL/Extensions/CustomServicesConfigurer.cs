using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace ApplicationBLL.Extensions;

public static class CustomServicesConfigurer
{
    public static void ConfigureCustomServices(this IServiceCollection serviceProvider)
    {
        
    }

    public static void AddAutoMapperProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }
}