using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobApplyService : IJobApplyService
{
    private readonly IUserService _userService;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;

    public JobApplyService(IUserService userService, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IJobQueryRepository jobQueryRepository)
    {
        _userService = userService;
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _jobQueryRepository = jobQueryRepository;
    }

    public async Task<JobApply> PostJobApply(int jobId, int jobSeekerId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var job = await _jobQueryRepository.GetJobById(jobId);
        var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithJobApplies(currentUserId);
        if (currentJobSeeker.Id != jobSeekerId)
        {
            throw new ForbiddenException();
        }

        var jobApply = currentJobSeeker.JobApplies.FirstOrDefault(j => j.JobId == jobId);
        if (jobApply != null)
        {
            throw new JobApplyingException("You've already applied");
        }
        
        var createdJobApply = new JobApply()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerId,
            DateTime = DateTime.UtcNow,
            Job = job,
            JobSeekerAccount = currentJobSeeker
        };
        return createdJobApply;
    }

    public async Task<JobApply> DeleteJobApply(int jobId, int jobSeekerId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithJobApplies(currentUserId);
        if (currentJobSeeker.Id != jobSeekerId)
        {
            throw new ForbiddenException();
        }

        var jobApply = currentJobSeeker.JobApplies.FirstOrDefault(j => j.JobId == jobId);
        if (jobApply == null)
        {
            throw new JobApplyingException("You've not applied for this job");
        }
        return jobApply;
    }
}