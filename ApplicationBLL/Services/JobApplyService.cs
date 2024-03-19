using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobApplyService : IJobApplyService
{
    private readonly IEmployerService _employerService;
    private readonly IJobApplyQueryRepository _jobApplyQueryRepository;
    private readonly IJobQueryRepository _jobQueryRepository;
    private readonly IJobSeekerService _jobSeekerService;

    public JobApplyService(IJobApplyQueryRepository jobApplyQueryRepository, IJobQueryRepository jobQueryRepository,
        IEmployerService employerService,
        IJobSeekerService jobSeekerService)
    {
        _jobApplyQueryRepository = jobApplyQueryRepository;
        _jobQueryRepository = jobQueryRepository;
        _employerService = employerService;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<JobApply> GetJobApplyForConversation(int jobSeekerId, int jobId)
    {
        var jobApply = await _jobApplyQueryRepository.GetJobApplyForConversation(jobSeekerId, jobId);
        if (jobSeekerId != _jobSeekerService.GetCurrentJobSeekerId() &&
            jobApply.Job.EmployerId != _employerService.GetCurrentEmployerId())
            throw new ForbiddenException("Something went wrong you couldn't load this conversation");

        return jobApply;
    }

    public async Task<JobApply> GetJobApplyByJobSeekerAndJobIds(int jobSeekerId, int jobId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var jobApply = await _jobApplyQueryRepository.GetJobApplyForReview(jobSeekerId, jobId);
        if (jobApply.Job.EmployerId != currentEmployerId) throw new ForbiddenException();

        return jobApply;
    }

    public async Task<Job> GetJobAppliesForSpecificJob(int jobId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var job = await _jobQueryRepository.GetJobWithJobApplies(jobId);
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
        var job = await _jobQueryRepository.GetJobByIdForEmployers(jobId);
        job.NumberOfJobApplies++;
        var createdJobApply = new JobApply
        {
            JobId = jobId,
            JobSeekerId = currentJobSeekerId,
            DateApplied = DateOnly.FromDateTime(DateTime.UtcNow),
            JobApplyStatus = JobApplyStatuses.NotSpecified,
            Job = job
        };
        return createdJobApply;
    }

    public async Task<JobApply> UpdateJobApply(int jobSeekerId, int jobId, JobApply updatedJobApply)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var jobApplyEntity = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId);
        if (jobApplyEntity.Job.EmployerId != currentEmployerId)
            throw new ForbiddenException("You can not update this job apply");

        jobApplyEntity.IsReviewed = updatedJobApply.IsReviewed;

        switch (jobApplyEntity.JobApplyStatus)
        {
            case JobApplyStatuses.Rejected:
                jobApplyEntity.Job.NumberOfRejectedCandidates--;
                break;
            case JobApplyStatuses.NotSpecified:
                break;
            case JobApplyStatuses.Interested:
                jobApplyEntity.Job.NumberOfContactingCandidates--;
                break;
            case JobApplyStatuses.Hired:
                throw new JobApplyingException(
                    "You have already hired this candidate you can not change job apply status");
        }

        switch (updatedJobApply.JobApplyStatus)
        {
            case JobApplyStatuses.Rejected:
                jobApplyEntity.Job.NumberOfRejectedCandidates++;
                break;
            case JobApplyStatuses.NotSpecified:
                break;
            case JobApplyStatuses.Interested:
                jobApplyEntity.Job.NumberOfContactingCandidates++;
                break;
            case JobApplyStatuses.Hired:
                jobApplyEntity.Job.NumberOfPeopleHired++;
                break;
        }

        jobApplyEntity.JobApplyStatus = updatedJobApply.JobApplyStatus;
        return jobApplyEntity;
    }

    public async Task<JobApply> DeleteJobApply(int jobId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var jobApplyEntity = await _jobApplyQueryRepository.GetJobApplyByJobIdAndJobSeekerId(jobId, currentJobSeekerId);
        jobApplyEntity.Job.NumberOfJobApplies--;
        return jobApplyEntity;
    }
}