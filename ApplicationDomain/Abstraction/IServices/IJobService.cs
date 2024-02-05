using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobService
{
    public Task<Job> CreateJob(Job job);
    public Task<Job> UpdateJob(int jobId, Job updatedJob);
    public Task<Job> DeleteJob(int jobId);
}