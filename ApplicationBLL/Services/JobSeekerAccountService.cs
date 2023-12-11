using ApplicationBLL.Interfaces;
using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobSeekerAccountService : IJobSeekerAccountService
{
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IUserService _userService;
    private readonly ISavedJobQueryRepository _savedJobQueryRepository;
    
    public JobSeekerAccountService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IUserService userService,
        ISavedJobQueryRepository savedJobQueryRepository)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _userService = userService;
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

        if (savedJob != null)
        {
            throw new JobSavingException("This job is already saved");
        }

        var newSavedJob = new SavedJob()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerAccount.Id
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