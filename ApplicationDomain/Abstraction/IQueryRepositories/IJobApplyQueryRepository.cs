using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobApplyQueryRepository
{
    public Task<JobApply> GetJobApplyByJobIdAndJobSeekerId(int jobId, int jobSeekerId);
    public Task<IEnumerable<JobApply>> GetJobAppliesByJobSeekerId(int jobSeekerId);
}