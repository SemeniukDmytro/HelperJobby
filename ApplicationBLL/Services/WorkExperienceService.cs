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

    public async Task<(WorkExperience workExperience, bool isResumeNeedToBeDeleted)> Delete(int workExperienceId)
    {
        var isInvalidResume = false;
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume == null)
        {
            throw new ResumeNotFoundException();
        }
        var workExperience = jobSeekerAccount.Resume.WorkExperiences.FirstOrDefault(we => we.WorkExperienceId == workExperienceId);

        if (workExperience == null)
        {
            throw new ForbiddenException();
        }
        if (jobSeekerAccount.Resume.Educations.Count == 0 && jobSeekerAccount.Resume.WorkExperiences.Count <= 1
                                                          && jobSeekerAccount.Resume.Skills.Count == 0)
        {
            isInvalidResume = true;
        }
        workExperience.Resume = jobSeekerAccount.Resume;
        return (workExperience, isInvalidResume);
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
    
   
}