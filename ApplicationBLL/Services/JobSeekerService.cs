using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobSeekerService : IJobSeekerService
{
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly ISavedJobQueryRepository _savedJobQueryRepository;
    private readonly IUserService _userService;

    public JobSeekerService(IJobSeekerQueryRepository jobSeekerQueryRepository,
        IUserService userService,
        ISavedJobQueryRepository savedJobQueryRepository)
    {
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
        _userService = userService;
        _savedJobQueryRepository = savedJobQueryRepository;
    }

    public async Task<JobSeeker> UpdateJobSeeker(int userId, JobSeeker updatedJobSeeker)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (userId != currentUserId) throw new ForbiddenException();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithAddress(userId);
        if (jobSeeker.UserId != userId) throw new ForbiddenException();

        if (!string.IsNullOrEmpty(updatedJobSeeker.FirstName)) jobSeeker.FirstName = updatedJobSeeker.FirstName;

        if (!string.IsNullOrEmpty(updatedJobSeeker.LastName)) jobSeeker.LastName = updatedJobSeeker.LastName;
        jobSeeker.PhoneNumber = updatedJobSeeker.PhoneNumber;
        if (jobSeeker.Address == null)
        {
            jobSeeker.Address = updatedJobSeeker.Address;
        }
        else if (updatedJobSeeker.Address != null)
        {
            if (!string.IsNullOrEmpty(updatedJobSeeker.Address.City))
                jobSeeker.Address.City = updatedJobSeeker.Address.City;

            if (!string.IsNullOrEmpty(updatedJobSeeker.Address.Country))
                jobSeeker.Address.Country = updatedJobSeeker.Address.Country;
            jobSeeker.Address.StreetAddress = updatedJobSeeker.Address.StreetAddress;
            jobSeeker.Address.PostalCode = updatedJobSeeker.Address.PostalCode;
        }

        return jobSeeker;
    }

    public async Task<SavedJob> SaveJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerByUserId(currentUserId);
        SavedJob savedJob = null;
        try
        {
            savedJob = await _savedJobQueryRepository.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeeker.Id);
        }
        catch (Exception e)
        {
        }

        if (savedJob != null) throw new JobSavingException("This job is already saved");

        var newSavedJob = new SavedJob
        {
            JobId = jobId,
            JobSeekerId = jobSeeker.Id,
            DateSaved = DateOnly.FromDateTime(DateTime.UtcNow)
        };

        return newSavedJob;
    }

    public async Task<SavedJob> RemoveJobFromSaved(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerByUserId(currentUserId);
        var savedJob = await _savedJobQueryRepository.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeeker.Id);
        return savedJob;
    }
}