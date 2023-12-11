using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class WorkExperienceService : IWorkExperienceService
{
    private readonly IUserService _userService;
    private readonly IWorkExperienceQueryRepository _workExperienceQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;

    public WorkExperienceService(IUserService userService, 
        IWorkExperienceQueryRepository workExperienceQueryRepository, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository,
        IEnqueuingTaskHelper enqueuingTaskHelper)
    {
        _userService = userService;
        _workExperienceQueryRepository = workExperienceQueryRepository;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _enqueuingTaskHelper = enqueuingTaskHelper;
    }

    public async Task<WorkExperience> AddWorkExperience(int resumeId, WorkExperience workExperience)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume.Id != resumeId)
        {
            throw new ForbiddenException("You can not add work experience to this resume");
        }

        workExperience.ResumeId = resumeId;
        return workExperience;
    }

    public async Task<WorkExperience> UpdateWorkExperience(int workExperienceId, WorkExperience updatedWorkExperience)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        var workExperienceEntity = await _workExperienceQueryRepository.GetWorkExperienceById(workExperienceId);
        if (workExperienceEntity.ResumeId != jobSeekerAccount.Resume.Id)
        {
            throw new ForbiddenException();
        }

        var oldWorkExperienceJobTitle = workExperienceEntity.JobTitle;
        workExperienceEntity = UpdateWorkExperience(workExperienceEntity, updatedWorkExperience);
        await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
        {
            await indexingService.UpdateIndexedResumeRelatedContent(oldWorkExperienceJobTitle,
                workExperienceEntity.JobTitle,
                workExperienceEntity.ResumeId);
        });
        return workExperienceEntity;
    }

    private WorkExperience UpdateWorkExperience(WorkExperience workExperienceEntity, WorkExperience updatedWorkExperience)
    {
        if (string.IsNullOrEmpty(workExperienceEntity.JobTitle))
        {
            throw new InvalidWorkExperienceException("You can not pass the empty job title");
        }
        
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
    
    public async Task<WorkExperience> Delete(int workExperienceId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        var workExperience = await _workExperienceQueryRepository.GetWorkExperienceById(workExperienceId);
        if (workExperience.ResumeId != jobSeekerAccount.Resume.Id)
        {
            throw new ForbiddenException();
        }
        return workExperience;
    }
}