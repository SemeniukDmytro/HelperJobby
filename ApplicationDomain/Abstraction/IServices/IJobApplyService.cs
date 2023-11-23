using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobApplyService
{
    public Task<JobApply> PostJobApply(int jobId);
    public Task<JobApply> DeleteJobApply(int jobId);
}