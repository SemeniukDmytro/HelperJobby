using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobApplyService : IJobApplyService
{
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IJobApplyQueryRepository _jobApplyQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IUserService _userService;

    public JobApplyService(IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository,
        IJobApplyQueryRepository jobApplyQueryRepository,
        IEmployerAccountQueryRepository employerAccountQueryRepository, IJobQueryRepository jobQueryRepository)
    {
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _jobApplyQueryRepository = jobApplyQueryRepository;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _jobQueryRepository = jobQueryRepository;
    }

    public async Task<Job> GetJobAppliesForSpecificJob(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        var job = await _jobQueryRepository.GetJobById(jobId);
        if (job.EmployerAccountId != currentEmployer.Id)
            throw new ForbiddenException("You can not have access to this information");

        return job;
    }

    public async Task<JobApply> PostJobApply(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(currentUserId);
        JobApply jobApply = null;
        try
        {
            jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, currentJobSeeker.Id);
        }
        catch (Exception e)
        {
        }

        if (jobApply != null) throw new JobApplyingException("You have already applied");

        var createdJobApply = new JobApply
        {
            JobId = jobId,
            JobSeekerAccountId = currentJobSeeker.Id,
            DateApplied = DateOnly.FromDateTime(DateTime.UtcNow)
        };
        return createdJobApply;
    }

    public async Task<JobApply> DeleteJobApply(int jobId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(currentUserId);
        var jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, currentJobSeeker.Id);
        return jobApply;
    }
}