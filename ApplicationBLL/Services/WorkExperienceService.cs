using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class WorkExperienceService : IWorkExperienceService
{
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IUserService _userService;
    private readonly IWorkExperienceQueryRepository _workExperienceQueryRepository;

    public WorkExperienceService(IUserService userService,
        IWorkExperienceQueryRepository workExperienceQueryRepository,
        IJobSeekerQueryRepository jobSeekerQueryRepository,
        IEnqueuingTaskHelper enqueuingTaskHelper)
    {
        _userService = userService;
        _workExperienceQueryRepository = workExperienceQueryRepository;
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
        _enqueuingTaskHelper = enqueuingTaskHelper;
    }

    public async Task<WorkExperience> AddWorkExperience(int resumeId, WorkExperience createdWorkExperience)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume.Id != resumeId)
            throw new ForbiddenException("You can not add work experience to this resume");

        createdWorkExperience.ResumeId = resumeId;
        return createdWorkExperience;
    }

    public async Task<WorkExperience> UpdateWorkExperience(int workExperienceId, WorkExperience updatedWorkExperience)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        var workExperienceEntity = await _workExperienceQueryRepository.GetWorkExperienceById(workExperienceId);
        if (workExperienceEntity.ResumeId != jobSeeker.Resume.Id) throw new ForbiddenException();

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

    public async Task<(WorkExperience workExperience, bool isResumeNeedToBeDeleted)> DeleteWorkExperience(int workExperienceId)
    {
        var isInvalidResume = false;
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume == null) throw new ResumeNotFoundException();
        var workExperience =
            jobSeeker.Resume.WorkExperiences.FirstOrDefault(we => we.Id == workExperienceId);

        if (workExperience == null) throw new ForbiddenException();
        if (jobSeeker.Resume.Educations.Count == 0 && jobSeeker.Resume.WorkExperiences.Count <= 1
                                                          && jobSeeker.Resume.Skills.Count == 0)
            isInvalidResume = true;
        workExperience.Resume = jobSeeker.Resume;
        return (workExperience, isInvalidResume);
    }

    private WorkExperience UpdateWorkExperience(WorkExperience workExperienceEntity,
        WorkExperience updatedWorkExperience)
    {
        if (string.IsNullOrEmpty(workExperienceEntity.JobTitle))
            throw new InvalidWorkExperienceException("You can not pass the empty job title");

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