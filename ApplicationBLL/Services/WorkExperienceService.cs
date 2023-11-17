using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class WorkExperienceService : IWorkExperienceService
{
    private readonly ICurrentUserChecker _currentUserChecker;
    private readonly IUserService _userService;
    private readonly IWorkExperienceQueryRepository _workExperienceQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;

    public WorkExperienceService(ICurrentUserChecker currentUserChecker, IUserService userService, 
        IWorkExperienceQueryRepository workExperienceQueryRepository, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository)
    {
        _currentUserChecker = currentUserChecker;
        _userService = userService;
        _workExperienceQueryRepository = workExperienceQueryRepository;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
    }

    public Task<WorkExperience> AddEducation(int resumeId, WorkExperience education)
    {
        throw new NotImplementedException();
    }

    public Task<WorkExperience> UpdateEducation(int workExperienceId, int userId, WorkExperience updatedEducation)
    {
        throw new NotImplementedException();
    }

    public Task<WorkExperience> Delete(int workExperienceId, int userId)
    {
        throw new NotImplementedException();
    }
}