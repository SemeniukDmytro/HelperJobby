using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobApplyService : IJobApplyService
{
    private readonly IUserService _userService;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IJobApplyQueryRepository _jobApplyQueryRepository;

    public JobApplyService(IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository,
        IJobApplyQueryRepository jobApplyQueryRepository)
    {
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _jobApplyQueryRepository = jobApplyQueryRepository;
    }

    public async Task<JobApply> PostJobApply(int jobId, int jobSeekerId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        JobApply jobApply = null;
        try
        {
            jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId);
        }
        catch (Exception e)
        {
        }

        if (jobApply != null)
        {
            throw new JobApplyingException("You have already applied");
        }
        var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(currentUserId);
        if (currentJobSeeker.Id != jobSeekerId)
        {
            throw new ForbiddenException();
        }
        
        var createdJobApply = new JobApply()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerId,
            DateTime = DateTime.UtcNow
        };
        return createdJobApply;
    }

    public async Task<JobApply> DeleteJobApply(int jobId, int jobSeekerId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountByUserId(currentUserId);
        var jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId);
        if (currentJobSeeker.Id != jobSeekerId)
        {
            throw new ForbiddenException();
        }
        return jobApply;
    }
}