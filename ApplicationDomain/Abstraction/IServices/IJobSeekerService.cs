using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobSeekerService
{
    public int GetCurrentJobSeekerId();
    public Task<JobSeeker> UpdateJobSeeker(int jobSeekerId, JobSeeker updatedJobSeeker);
    public Task<SavedJob> SaveJob(int jobId);
    public Task<SavedJob> RemoveJobFromSaved(int jobId);
}