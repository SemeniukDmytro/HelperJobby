using System.Reflection;
using ApplicationBLL.Interfaces;
using ApplicationBLL.Logic;
using ApplicationBLL.Services.AuthService;
using ApplicationBLL.Services.UserService;
using ApplicationDAL.CommandRepositories;
using ApplicationDAL.QueryRepositories;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using FluentValidation;
using HelperJobby.DTOs.User;
using HelperJobby.Validators;

namespace HelperJobby.Extensions;

public static class CustomServicesConfigurer
{
    public static void ConfigureCustomServices(this IServiceCollection serviceProvider)
    {
        serviceProvider.AddTransient<IValidator<LoginUserDTO>, LoginUserDTOValidator>();
        serviceProvider.AddTransient<IValidator<CreateUpdateUserDTO>, CreateUserDTOValidator>();
        serviceProvider.AddScoped<IAuthService, AuthService>();
        serviceProvider.AddScoped<IUserService, UserService>();
        serviceProvider.AddScoped<IUserQueryRepository, UserQueryRepository>();
        serviceProvider.AddScoped<IUserCommandRepository, UserCommandRepository>();
        
        serviceProvider.AddScoped<CurrentUserIdProvider>();
        serviceProvider.AddScoped<IUserIdSetter>(provider => provider.GetService<CurrentUserIdProvider>());
        serviceProvider.AddScoped<IUserIdGetter>(provider => provider.GetService<CurrentUserIdProvider>());
        serviceProvider.AddSingleton<IPasswordHandler, PasswordHandler>();
    }

    public static void AddAutoMapperProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }
}