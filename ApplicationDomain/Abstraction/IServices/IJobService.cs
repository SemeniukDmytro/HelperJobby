using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobService
{
    public Task<Job> CreateJob(Job job);
    public Task<Job> UpdateJob(int jobId, int employerAccountId, Job job);
    public Task<Job> DeleteJob(int jobId, int employerAccountId);
}