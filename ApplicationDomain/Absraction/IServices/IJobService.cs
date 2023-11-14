using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IJobService
{
    public Task<Job> CreateJob(Job job);
    public Task<Job> UpdateJob(int jobId, int employerAccountId, Job job);
    public Task<Job> DeleteJob(int jobId, int employerAccountId);
    public Task<SavedJob> SaveJob(int jobId, int jobSeekerId);
    public Task<SavedJob> RemoveFromSaved(int jobId, int jobSeekerId);
}