using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class EducationService : IEducationService
{
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IJobSeekerService _jobSeekerService;
    private readonly IResumeQueryRepository _resumeQueryRepository;

    public EducationService(IEnqueuingTaskHelper enqueuingTaskHelper, IJobSeekerService jobSeekerService,
        IResumeQueryRepository resumeQueryRepository)
    {
        _enqueuingTaskHelper = enqueuingTaskHelper;
        _jobSeekerService = jobSeekerService;
        _resumeQueryRepository = resumeQueryRepository;
    }

    public async Task<Education> AddEducation(int resumeId, Education education)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        if (resume.Id != resumeId)
            throw new ForbiddenException("You can not add education to this resume");
        education.ResumeId = resumeId;
        return education;
    }

    public async Task<Education> UpdateEducation(int educationId, Education updatedEducation)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        var educationEntity = resume.Educations.FirstOrDefault(e => e.Id == educationId);

        if (educationEntity == null) throw new EducationNotFoundException();

        var oldEducationFieldOfStudy = educationEntity.FieldOfStudy;
        educationEntity = UpdateEducation(educationEntity, updatedEducation);
        await _enqueuingTaskHelper.EnqueueResumeIndexingTaskAsync(async indexingService =>
        {
            await indexingService.UpdateIndexedResumeRelatedContent(oldEducationFieldOfStudy,
                educationEntity.FieldOfStudy, educationEntity.ResumeId);
        });
        return educationEntity;
    }

    public async Task<(Education educationToDelete, bool isResumeNeedToBeDeleted)> DeleteEducation(int educationId)
    {
        var isInvalidResume = false;
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        var educationEntity = resume.Educations.FirstOrDefault(e => e.Id == educationId);
        if (educationEntity == null) throw new ForbiddenException();

        if (resume.Educations.Count <= 1 && resume.WorkExperiences.Count == 0
                                         && resume.Skills.Count == 0)
            isInvalidResume = true;

        educationEntity.Resume = resume;

        return (educationEntity, isInvalidResume);
    }

    private Education UpdateEducation(Education educationEntity, Education updatedEducation)
    {
        if (string.IsNullOrEmpty(updatedEducation.LevelOfEducation))
            throw new InvalidEducationException("Level of education is required");

        educationEntity.From = updatedEducation.From;
        educationEntity.To = updatedEducation.To;
        educationEntity.Country = updatedEducation.Country;
        educationEntity.City = updatedEducation.City;
        educationEntity.SchoolName = updatedEducation.SchoolName;
        educationEntity.LevelOfEducation = updatedEducation.LevelOfEducation;
        educationEntity.FieldOfStudy = updatedEducation.FieldOfStudy;
        return educationEntity;
    }
}