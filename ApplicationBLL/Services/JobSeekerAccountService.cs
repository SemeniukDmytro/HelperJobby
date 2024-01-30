using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobSeekerAccountService : IJobSeekerAccountService
{
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly ISavedJobQueryRepository _savedJobQueryRepository;
    private readonly IUserService _userService;

    public JobSeekerAccountService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository,
        IUserService userService,
        ISavedJobQueryRepository savedJobQueryRepository)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _userService = userService;
        _savedJobQueryRepository = savedJobQueryRepository;
    }

    public async Task<JobSeekerAccount> UpdateJobSeekerAccount(int userId, JobSeekerAccount updatedAccount)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (userId != currentUserId) throw new ForbiddenException();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithAddress(userId);
        if (jobSeekerAccount.UserId != userId) throw new ForbiddenException();

        if (!string.IsNullOrEmpty(updatedAccount.FirstName)) jobSeekerAccount.FirstName = updatedAccount.FirstName;

        if (!string.IsNullOrEmpty(updatedAccount.LastName)) jobSeekerAccount.LastName = updatedAccount.LastName;
        jobSeekerAccount.PhoneNumber = updatedAccount.PhoneNumber;
        if (jobSeekerAccount.Address == null)
        {
            jobSeekerAccount.Address = updatedAccount.Address;
        }
        else if (updatedAccount.Address != null)
        {
            if (!string.IsNullOrEmpty(updatedAccount.Address.City))
                jobSeekerAccount.Address.City = updatedAccount.Address.City;

            if (!string.IsNullOrEmpty(updatedAccount.Address.Country))
                jobSeekerAccount.Address.Country = updatedAccount.Address.Country;
            jobSeekerAccount.Address.StreetAddress = updatedAccount.Address.StreetAddress;
            jobSeekerAccount.Address.PostalCode = updatedAccount.Address.PostalCode;
        }

        return jobSeekerAccount;
    }

    public async Task<SavedJob> SaveJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(currentUserId);
        SavedJob savedJob = null;
        try
        {
            savedJob = await _savedJobQueryRepository.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerAccount.Id);
        }
        catch (Exception e)
        {
        }

        if (savedJob != null) throw new JobSavingException("This job is already saved");

        var newSavedJob = new SavedJob
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerAccount.Id,
            DateSaved = DateOnly.FromDateTime(DateTime.UtcNow)
        };

        return newSavedJob;
    }

    public async Task<SavedJob> RemoveJobFromSaved(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(currentUserId);
        var savedJob = await _savedJobQueryRepository.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeeker.Id);
        return savedJob;
    }
}