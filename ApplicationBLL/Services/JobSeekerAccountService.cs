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
    private readonly IAddressChangeHandler _addressChangeHandler;
    private readonly IJobQueryRepository _jobQueryRepository;

    public JobSeekerAccountService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IUserService userService, 
        IAddressChangeHandler addressChangeHandler, IJobQueryRepository jobQueryRepository, ICurrentUserChecker currentUserChecker)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _userService = userService;
        _addressChangeHandler = addressChangeHandler;
        _jobQueryRepository = jobQueryRepository;
        _currentUserChecker = currentUserChecker;
    }

    public async Task<JobSeekerAccount> UpdateJobSeekerAccount(int userId, JobSeekerAccount updatedAccount)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (userId != currentUserId)
        {
            throw new ForbiddenException();
        }
        return updatedAccount;
    }

    public async Task<SavedJob> SaveJob(int jobId, int userId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var jobSeekerAccountAccountWithSavedJobs = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithSavedJobs(userId);
        bool jobAlreadySaved = jobSeekerAccountAccountWithSavedJobs.SavedJobs.Select(j => j.JobId).Contains(jobId);
        if (jobAlreadySaved)
        {
            throw new JobSavingException("This job is already saved");
        }
        var savedJob = new SavedJob()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerAccountAccountWithSavedJobs.Id
        };
        return savedJob;
    }

    public async Task<SavedJob> RemoveJobFromSaved(int jobId, int userId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var jobSeekerAccountAccountWithSavedJobs = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithSavedJobs(userId);
        bool jobNotSaved = !jobSeekerAccountAccountWithSavedJobs.SavedJobs.Select(j => j.JobId).Contains(jobId);
        if (jobNotSaved)
        {
            throw new JobSavingException("This job doesn't saved");
        }
        var savedJob = new SavedJob()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerAccountAccountWithSavedJobs.Id
        };
        return savedJob;
    }
}