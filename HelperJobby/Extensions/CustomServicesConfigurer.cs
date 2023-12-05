using System.Reflection;
using ApplicationBLL.Interfaces;
using ApplicationBLL.Logic;
using ApplicationBLL.RatingSystem;
using ApplicationBLL.Services;
using ApplicationDAL.CommandRepositories;
using ApplicationDAL.QueryRepositories;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using FluentValidation;
using HelperJobby.DTOs.Resume;
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
        serviceProvider.AddScoped<IEmployerAccountService, EmployerAccountService>();
        serviceProvider.AddScoped<IEmployerAccountQueryRepository, EmployerAccountQueryRepository>();
        serviceProvider.AddScoped<IEmployerAccountCommandRepository, EmployerAccountCommandRepository>();
        serviceProvider.AddScoped<IOrganizationService, OrganizationService>();
        serviceProvider.AddScoped<IOrganizationCommandRepository, OrganizationCommandRepository>();
        serviceProvider.AddScoped<IOrganizationQueryRepository, OrganizationQueryRepository>();
        serviceProvider.AddScoped<IJobService, JobService>();
        serviceProvider.AddScoped<IJobQueryRepository, JobQueryRepository>();
        serviceProvider.AddScoped<IJobCommandRepository, JobCommandRepository>();
        serviceProvider.AddScoped<CustomQueryIncluder>();
        serviceProvider.AddScoped<ICurrentJobCreationQueryRepository, CurrentJobCreationQueryRepository>();
        serviceProvider.AddScoped<ICurrentJobCreationCommandRepository, CurrentJobCreationCommandRepository>();
        serviceProvider.AddScoped<ICurrentJobCreationService, CurrentJobCreationService>();
        serviceProvider.AddScoped<IJobSeekerAccountService, JobSeekerAccountService>();
        serviceProvider.AddScoped<IJobSeekerAccountCommandRepository, JobSeekerAccountCommandRepository>();
        serviceProvider.AddScoped<IJobSeekerAccountQueryRepository, JobSeekerAccountQueryRepository>();
        serviceProvider.AddScoped<ISavedJobCommandRepository, SavedJobCommandRepository>();
        serviceProvider.AddScoped<ISavedJobQueryRepository, SavedJobQueryRepository>();
        serviceProvider.AddScoped<IResumeService, ResumeService>();
        serviceProvider.AddScoped<IResumeCommandRepository, ResumeCommandRepository>();
        serviceProvider.AddScoped<IResumeQueryRepository, ResumeQueryRepository>();
        serviceProvider.AddScoped<IEducationService, EducationService>();
        serviceProvider.AddScoped<IEducationCommandRepository, EducationCommandRepository>();
        serviceProvider.AddScoped<IEducationQueryRepository, EducationQueryRepository>();
        serviceProvider.AddScoped<IWorkExperienceQueryRepository, WorkExperienceQueryRepository>();
        serviceProvider.AddScoped<IWorkExperienceCommandRepository, WorkExperienceCommandRepository>();
        serviceProvider.AddScoped<IWorkExperienceService, WorkExperienceService>();
        serviceProvider.AddScoped<ISkillService, SkillService>();
        serviceProvider.AddScoped<ISkillCommandRepository, SkillCommandRepository>();
        serviceProvider.AddScoped<ISkillQueryRepository, SkillQueryRepository>();
        serviceProvider.AddScoped<IJobApplyService, JobApplyService>();
        serviceProvider.AddScoped<IJobApplyCommandRepository, JobApplyCommandRepository>();
        serviceProvider.AddScoped<IJobApplyQueryRepository, JobApplyQueryRepository>();
        serviceProvider.AddScoped<IInterviewService, InterviewService>();
        serviceProvider.AddScoped<IInterviewCommandRepository, InterviewCommandRepository>();
        serviceProvider.AddScoped<IInterviewQueryRepository, InterviewQueryRepository>();
        serviceProvider.AddScoped<IJobContentIndexingService, JobContentIndexingService>();
        serviceProvider.AddScoped<IJobIndexingQueryRepository, JobIndexingQueryRepository>();
        serviceProvider.AddScoped<IJobIndexingCommandRepository, JobIndexingCommandRepository>();
        serviceProvider.AddScoped<IResumeIndexingQueryRepository, ResumeIndexingQueryRepository>();
        serviceProvider.AddScoped<IResumeIndexingCommandRepository, ResumeIndexingCommandRepository>();
        serviceProvider.AddScoped<IResumeContentIndexingService, ResumeContentIndexingService>();
        serviceProvider.AddScoped<ISearchService, SearchService>();
        serviceProvider.AddScoped<IRankingService, RankingService>();
        serviceProvider.AddScoped<ISearchQueryRepository, SearchQueryRepository>();
        
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