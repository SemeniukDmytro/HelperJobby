using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobApplyService
{
    public Task<Job> GetJobAppliesForSpecificJob(int jobId);
    public Task<JobApply> PostJobApply(int jobId);
    public Task<JobApply> UpdateJobApply(int jobSeekerId, int jobId, JobApply updatedJobApply);
    public Task<JobApply> DeleteJobApply(int jobId);
}