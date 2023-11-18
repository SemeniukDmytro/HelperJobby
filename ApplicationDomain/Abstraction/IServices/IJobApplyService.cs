using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobApplyService
{
    public Task<JobApply> PostJobApply(int jobId, int jobSeekerId);
    public Task<JobApply> DeleteJobApply(int jobId, int jobSeekerId);
}