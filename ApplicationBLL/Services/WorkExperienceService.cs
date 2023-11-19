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

    public WorkExperienceService(IUserService userService, 
        IWorkExperienceQueryRepository workExperienceQueryRepository, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository)
    {
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