using System.Reflection;
using ApplicationBLL.Logic;
using ApplicationBLL.QueryRepositories;
using ApplicationBLL.QueryRepositories.Abstract.UserQueryRepository;
using ApplicationBLL.Services;
using ApplicationBLL.Services.AuthService;
using ApplicationBLL.Services.EmailAvailabilityService;
using ApplicationBLL.Services.UserService;
using ApplicationBLL.Validators;
using ApplicationCommon.DTOs.User;
using ApplicationCommon.Interfaces;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace ApplicationBLL.Extensions;

public static class CustomServicesConfigurer
{
    public static void ConfigureCustomServices(this IServiceCollection serviceProvider)
    {
        serviceProvider.AddTransient<IValidator<LoginUserDTO>, LoginUserValidator>();
        serviceProvider.AddTransient<IValidator<RegisterUserDTO>, RegisterUserDTOValidator>();
        serviceProvider.AddScoped<IAuthService, AuthService>();
        serviceProvider.AddScoped<IUserService, UserService>();
        serviceProvider.AddScoped<IEmailAvailabilityService, EmailAvailabilityService>();
        serviceProvider.AddScoped<IUserQueryRepository, UserQueryRepository>();
        
        serviceProvider.AddScoped<CurrentUserIdProvider>();
        serviceProvider.AddScoped<IUserIdSetter>(provider => provider.GetService<CurrentUserIdProvider>());
        serviceProvider.AddScoped<IUserIdGetter>(provider => provider.GetService<CurrentUserIdProvider>());
    }

    public static void AddAutoMapperProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }
}