using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class EducationService : IEducationService
{
    private readonly IEducationQueryRepository _educationQueryRepository;
    private readonly IEnqueuingTaskHelper _enqueuingTaskHelper;
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IUserService _userService;

    public EducationService(IEducationQueryRepository educationQueryRepository,
        IJobSeekerQueryRepository jobSeekerQueryRepository, IUserService userService,
        IEnqueuingTaskHelper enqueuingTaskHelper)
    {
        _educationQueryRepository = educationQueryRepository;
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
        _userService = userService;
        _enqueuingTaskHelper = enqueuingTaskHelper;
    }

    public async Task<Education> AddEducation(int resumeId, Education education)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume.Id != resumeId)
            throw new ForbiddenException("You can not add education to this resume");

        education.ResumeId = resumeId;
        return education;
    }

    public async Task<Education> UpdateEducation(int educationId, Education updatedEducation)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        var educationEntity = await _educationQueryRepository.GetEducationById(educationId);
        if (educationEntity.ResumeId != jobSeeker.Resume.Id) throw new ForbiddenException();
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
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume == null) throw new ResumeNotFoundException();
        var educationEntity = jobSeeker.Resume.Educations.FirstOrDefault(e => e.Id == educationId);
        if (educationEntity == null) throw new ForbiddenException();

        if (jobSeeker.Resume.Educations.Count <= 1 && jobSeeker.Resume.WorkExperiences.Count == 0
                                                          && jobSeeker.Resume.Skills.Count == 0)
            isInvalidResume = true;

        educationEntity.Resume = jobSeeker.Resume;

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