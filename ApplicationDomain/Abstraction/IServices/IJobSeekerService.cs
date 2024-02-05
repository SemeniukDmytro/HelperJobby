using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobSeekerService
{
    public Task<JobSeeker> UpdateJobSeeker(int userId, JobSeeker updatedJobSeeker);
    public Task<SavedJob> SaveJob(int jobId);
    public Task<SavedJob> RemoveJobFromSaved(int jobId);
}