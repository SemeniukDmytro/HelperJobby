using System.Reflection;
using ApplicationBLL.BackgroundHostedServices;
using ApplicationBLL.Interfaces;
using ApplicationBLL.Logic;
using ApplicationBLL.RatingSystem;
using ApplicationBLL.SearchRelatedServices;
using ApplicationBLL.Services;
using ApplicationDAL.CommandRepositories;
using ApplicationDAL.QueryRepositories;
using ApplicationDAL.SearchCommandRepositories;
using ApplicationDAL.SearchQueryRepositories;
using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchICommandRepositories;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
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
        serviceProvider.AddScoped<IEmployerService, EmployerService>();
        serviceProvider.AddScoped<IEmployerQueryRepository, EmployerQueryRepository>();
        serviceProvider.AddScoped<IEmployerCommandRepository, EmployerCommandRepository>();
        serviceProvider.AddScoped<IOrganizationService, OrganizationService>();
        serviceProvider.AddScoped<IOrganizationCommandRepository, OrganizationCommandRepository>();
        serviceProvider.AddScoped<IOrganizationQueryRepository, OrganizationQueryRepository>();
        serviceProvider.AddScoped<IJobService, JobService>();
        serviceProvider.AddScoped<IJobQueryRepository, JobQueryRepository>();
        serviceProvider.AddScoped<IJobCommandRepository, JobCommandRepository>();
        serviceProvider.AddScoped<IIncompleteJobQueryRepository, IncompleteJobQueryRepository>();
        serviceProvider.AddScoped<IIncompleteJobCommandRepository, IncompleteJobCommandRepository>();
        serviceProvider.AddScoped<IIncompleteJobService, IncompleteJobService>();
        serviceProvider.AddScoped<IJobSeekerService, JobSeekerService>();
        serviceProvider.AddScoped<IJobSeekerCommandRepository, JobSeekerCommandRepository>();
        serviceProvider.AddScoped<IJobSeekerQueryRepository, JobSeekerQueryRepository>();
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
        serviceProvider.AddScoped<IRecentUserSearchQueryRepository, RecentUserSearchQueryRepository>();
        serviceProvider.AddScoped<IRecentUserSearchCommandRepository, RecentUserSearchCommandRepository>();
        serviceProvider.AddScoped<IRecentUserSearchService, RecentUserSearchService>();
        serviceProvider.AddScoped<IRecommendationService, RecommendationService>();
        serviceProvider.AddScoped<ILocationService, LocationService>();
        serviceProvider.AddScoped<IFilteringService, FilteringService>();
        serviceProvider.AddScoped<IConversationQueryRepository, ConversationQueryRepository>();
        serviceProvider.AddScoped<IConversationCommandRepository, ConversationCommandRepository>();
        serviceProvider.AddScoped<IConversationService, ConversationService>();
        serviceProvider.AddScoped<IMessageQueryRepository, MessageQueryRepository>();
        serviceProvider.AddScoped<IMessageCommandRepository, MessageCommandRepository>();
        serviceProvider.AddScoped<IMessageService, MessageService>();
        

        //background related
        serviceProvider.AddSingleton<IBackgroundTaskQueue, BackgroundTaskQueue>();
        serviceProvider.AddHostedService<QueuedHostedService>();
        serviceProvider.AddScoped<IEnqueuingTaskHelper, EnqueuingTaskHelper>();

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