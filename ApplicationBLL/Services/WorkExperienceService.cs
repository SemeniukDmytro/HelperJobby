using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class WorkExperienceService : IWorkExperienceService
{
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IResumeQueryRepository _resumeQueryRepository;
    private readonly IJobSeekerService _jobSeekerService;

    public WorkExperienceService(IEnqueuingTaskHelper enqueuingTaskHelper,
        IResumeQueryRepository resumeQueryRepository, IJobSeekerService jobSeekerService)
    {
        _enqueuingTaskHelper = enqueuingTaskHelper;
        _resumeQueryRepository = resumeQueryRepository;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<WorkExperience> AddWorkExperience(int resumeId, WorkExperience createdWorkExperience)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        if (resume.Id != resumeId)
            throw new ForbiddenException("You can not add work experience to this resume");

        createdWorkExperience.ResumeId = resumeId;
        return createdWorkExperience;
    }

    public async Task<WorkExperience> UpdateWorkExperience(int workExperienceId, WorkExperience updatedWorkExperience)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        var workExperienceEntity = resume.WorkExperiences.FirstOrDefault(we => we.Id == workExperienceId);
        if (workExperienceEntity == null) throw new WorkExperienceNotFoundException();

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

    public async Task<(WorkExperience workExperience, bool isResumeNeedToBeDeleted)> DeleteWorkExperience(
        int workExperienceId)
    {
        var isInvalidResume = false;
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        var workExperience = resume.WorkExperiences.FirstOrDefault(we => we.Id == workExperienceId);
        if (workExperience == null) throw new WorkExperienceNotFoundException();

        if (resume.Educations.Count == 0 && resume.WorkExperiences.Count <= 1
                                         && resume.Skills.Count == 0)
        {
            isInvalidResume = true;
        }
        
        workExperience.Resume = resume;
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