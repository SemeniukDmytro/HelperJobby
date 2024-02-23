using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobApplyService
{
    public Task<JobApply> GetJobApplyByJobSeekerAndJobIds(int jobSeekerId, int jobId);
    public Task<Job> GetJobAppliesForSpecificJob(int jobId);
    public Task<JobApply> PostJobApply(int jobId);
    public Task<JobApply> UpdateJobApply(int jobSeekerId, int jobId, JobApply updatedJobApply);
    public Task<JobApply> DeleteJobApply(int jobId);
}