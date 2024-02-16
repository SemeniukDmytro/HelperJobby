using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobSeekerService : IJobSeekerService
{
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly ISavedJobQueryRepository _savedJobQueryRepository;
    private readonly IUserIdGetter _userIdGetter;

    public JobSeekerService(IJobSeekerQueryRepository jobSeekerQueryRepository,
        ISavedJobQueryRepository savedJobQueryRepository, IUserIdGetter userIdGetter)
    {
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
        _savedJobQueryRepository = savedJobQueryRepository;
        _userIdGetter = userIdGetter;
    }

    public int GetCurrentJobSeekerId()
    {
        return _userIdGetter.CurrentJobSeekerId;
    }

    public async Task<JobSeeker> UpdateJobSeeker(int jobSeekerId, JobSeeker updatedJobSeeker)
    {
        var currentJobSeekerId =  GetCurrentJobSeekerId();
        if (jobSeekerId != currentJobSeekerId) throw new ForbiddenException();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerByIdWithAddress(jobSeekerId);

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
        var currentJobSeekerId = GetCurrentJobSeekerId();
        SavedJob savedJob = null;
        try
        {
            savedJob = await _savedJobQueryRepository.GetSavedJobByJobIdAndJobSeekerId(jobId, currentJobSeekerId);
        }
        catch (Exception e)
        {
        }

        if (savedJob != null) throw new JobSavingException("This job is already saved");

        var newSavedJob = new SavedJob
        {
            JobId = jobId,
            JobSeekerId = currentJobSeekerId,
            DateSaved = DateOnly.FromDateTime(DateTime.UtcNow)
        };

        return newSavedJob;
    }

    public async Task<SavedJob> RemoveJobFromSaved(int jobId)
    {
        var currentJobSeekerId = GetCurrentJobSeekerId();
        var savedJob = await _savedJobQueryRepository.GetSavedJobByJobIdAndJobSeekerId(jobId, currentJobSeekerId);
        return savedJob;
    }
}