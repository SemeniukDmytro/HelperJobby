using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class EducationService : IEducationService
{
    private readonly IUserService _userService;
    private readonly IEducationQueryRepository _educationQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IResumeContentIndexingService _resumeContentIndexingService;

    public EducationService(IEducationQueryRepository educationQueryRepository,
        IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IUserService userService, IResumeContentIndexingService resumeContentIndexingService)
    {
        _educationQueryRepository = educationQueryRepository;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _userService = userService;
        _resumeContentIndexingService = resumeContentIndexingService;
    }

    public async Task<Education> AddEducation(int resumeId, Education education)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume.Id != resumeId)
        {
            throw new ForbiddenException("You can not add education to this resume");
        }

        education.ResumeId = resumeId;
        return education;
    }

    public async Task<Education> UpdateEducation(int educationId, Education updatedEducation)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        var educationEntity = await _educationQueryRepository.GetEducationById(educationId);
        if (educationEntity.ResumeId != jobSeekerAccount.Resume.Id)
        {
            throw new ForbiddenException();
        }
        var oldEducationFieldOfStudy = educationEntity.FieldOfStudy;
        educationEntity = UpdateEducation(educationEntity, updatedEducation);
        await _resumeContentIndexingService.UpdateIndexedResumeRelatedContent(oldEducationFieldOfStudy, educationEntity.FieldOfStudy, educationEntity.ResumeId);
        return educationEntity;
    }

    private Education UpdateEducation(Education educationEntity, Education updatedEducation)
    {
        if (string.IsNullOrEmpty(updatedEducation.LevelOfEducation))
        {
            throw new InvalidEducationException("Level of education is required");
        }
        
        educationEntity.From = updatedEducation.From;
        educationEntity.To = updatedEducation.To;
        educationEntity.Country = updatedEducation.Country;
        educationEntity.City = updatedEducation.City;
        educationEntity.SchoolName = updatedEducation.SchoolName;
        educationEntity.LevelOfEducation = updatedEducation.LevelOfEducation;
        educationEntity.FieldOfStudy = updatedEducation.FieldOfStudy;
        return educationEntity;
    }
    
    public async Task<Education> Delete(int educationId)
    {
        
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        var educationEntity = await _educationQueryRepository.GetEducationById(educationId);
        if (educationEntity.ResumeId != jobSeekerAccount.Resume.Id)
        {
            throw new ForbiddenException();
        }
        return educationEntity;
    }
}