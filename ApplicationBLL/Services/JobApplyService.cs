using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobApplyService : IJobApplyService
{
    private readonly IEmployerQueryRepository _employerQueryRepository;
    private readonly IJobApplyQueryRepository _jobApplyQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IEmployerService _employerService;
    private readonly IJobSeekerService _jobSeekerService;

    public JobApplyService(IJobSeekerQueryRepository jobSeekerQueryRepository,
        IJobApplyQueryRepository jobApplyQueryRepository,
        IEmployerQueryRepository employerQueryRepository, IJobQueryRepository jobQueryRepository, IEmployerService employerService,
        IJobSeekerService jobSeekerService)
    {
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
        _jobApplyQueryRepository = jobApplyQueryRepository;
        _employerQueryRepository = employerQueryRepository;
        _jobQueryRepository = jobQueryRepository;
        _employerService = employerService;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<Job> GetJobAppliesForSpecificJob(int jobId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var job = await _jobQueryRepository.GetJobById(jobId);
        if (job.EmployerId != currentEmployerId)
            throw new ForbiddenException("You can not have access to this information");

        return job;
    }

    public async Task<JobApply> PostJobApply(int jobId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        JobApply jobApply = null;
        try
        {
            jobApply = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, currentJobSeekerId);
        }
        catch (Exception e)
        {
        }

        if (jobApply != null) throw new JobApplyingException("You have already applied");

        var createdJobApply = new JobApply
        {
            JobId = jobId,
            JobSeekerId = currentJobSeekerId,
            DateApplied = DateOnly.FromDateTime(DateTime.UtcNow)
        };
        return createdJobApply;
    }

    public async Task<JobApply> DeleteJobApply(int jobId)
    {
        var currentJobSeekerId = _employerService.GetCurrentEmployerId();
        var jobApplyEntity = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, currentJobSeekerId);
        return jobApplyEntity;
    }
}