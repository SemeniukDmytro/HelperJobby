using ApplicationBLL.Interfaces;
using ApplicationBLL.Logic;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobSeekerAccountService : IJobSeekerAccountService
{
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IUserService _userService;
    private readonly ICurrentUserChecker _currentUserChecker;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly ISavedJobQueryRepository _savedJobQueryRepository;
    
    public JobSeekerAccountService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IUserService userService, 
        IJobQueryRepository jobQueryRepository, ICurrentUserChecker currentUserChecker, ISavedJobQueryRepository savedJobQueryRepository)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _userService = userService;
        _jobQueryRepository = jobQueryRepository;
        _currentUserChecker = currentUserChecker;
        _savedJobQueryRepository = savedJobQueryRepository;
    }

    public async Task<JobSeekerAccount> UpdateJobSeekerAccount(int userId, JobSeekerAccount updatedAccount)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (userId != currentUserId)
        {
            throw new ForbiddenException();
        }
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithAddress(userId);
        if (jobSeekerAccount.UserId != userId)
        {
            throw new ForbiddenException();
        }

        if (updatedAccount.FirstName != "")
        {
            jobSeekerAccount.FirstName = updatedAccount.FirstName;
        }

        if (updatedAccount.LastName != "")
        {
            jobSeekerAccount.LastName = updatedAccount.LastName;
        }
        jobSeekerAccount.PhoneNumber = updatedAccount.PhoneNumber;
        if (jobSeekerAccount.Address == null)
        {
            jobSeekerAccount.Address = updatedAccount.Address;
        }
        else
        {
            jobSeekerAccount.Address.City = updatedAccount.Address.City;
            jobSeekerAccount.Address.Country = updatedAccount.Address.Country;
            jobSeekerAccount.Address.StreetAddress = updatedAccount.Address.StreetAddress;
            jobSeekerAccount.Address.PostalCode = updatedAccount.Address.PostalCode;
        }
        return jobSeekerAccount;
    }

    public async Task<SavedJob> SaveJob(int jobId, int userId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var job = await _jobQueryRepository.GetJobById(jobId);
        var jobSeekerAccountAccountWithSavedJobs = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithSavedJobs(userId);
        bool jobAlreadySaved = jobSeekerAccountAccountWithSavedJobs.SavedJobs.Select(j => j.JobId).Contains(jobId);
        if (jobAlreadySaved)
        {
            throw new JobSavingException("This job is already saved");
        }
        var savedJob = new SavedJob()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerAccountAccountWithSavedJobs.Id,
            Job = job,
            JobSeekerAccount = jobSeekerAccountAccountWithSavedJobs
        };
        return savedJob;
    }

    public async Task<SavedJob> RemoveJobFromSaved(int jobId, int userId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var savedJob = await _savedJobQueryRepository.GetSavedJobByJobAndUserIds(jobId, userId);
        var jobSeekerAccountAccountWithSavedJobs = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithSavedJobs(userId);
        bool jobNotSaved = !jobSeekerAccountAccountWithSavedJobs.SavedJobs.Select(j => j.JobId).Contains(jobId);
        if (jobNotSaved)
        {
            throw new JobSavingException("This job doesn't saved");
        }
        return savedJob;
    }
}