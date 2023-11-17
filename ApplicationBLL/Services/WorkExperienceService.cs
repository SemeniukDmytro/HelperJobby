using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
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

    public async Task<WorkExperience> AddWorkExperience(int resumeId, WorkExperience workExperience)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume.Id != resumeId)
        {
            throw new ForbiddenException();
        }

        workExperience.ResumeId = resumeId;
        return workExperience;
    }

    public async Task<WorkExperience> UpdateWorkExperience(int workExperienceId, int userId, WorkExperience updatedWorkExperience)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var workExperienceEntity = await _workExperienceQueryRepository.GetWorkExperienceById(workExperienceId);
        workExperienceEntity = UpdateWorkExperience(workExperienceEntity, updatedWorkExperience);
        return workExperienceEntity;
    }

    private WorkExperience UpdateWorkExperience(WorkExperience workExperienceEntity, WorkExperience updatedWorkExperience)
    {
        workExperienceEntity.From = updatedWorkExperience.From;
        workExperienceEntity.To = updatedWorkExperience.To;
        workExperienceEntity.Country = updatedWorkExperience.Country;
        workExperienceEntity.Company = updatedWorkExperience.Company;
        workExperienceEntity.Description = updatedWorkExperience.Description;
        workExperienceEntity.CityOrProvince = updatedWorkExperience.CityOrProvince;
        workExperienceEntity.JobTitle = updatedWorkExperience.JobTitle;
        workExperienceEntity.CurrentlyWorkHere = updatedWorkExperience.CurrentlyWorkHere;
        return workExperienceEntity;
    }
    
    public async Task<WorkExperience> Delete(int workExperienceId, int userId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var educationEntity = await _workExperienceQueryRepository.GetWorkExperienceById(workExperienceId);
        return educationEntity;
    }
}