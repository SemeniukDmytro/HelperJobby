using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobSeekerAccountService
{
    public Task<JobSeekerAccount> UpdateJobSeekerAccount(int userId, JobSeekerAccount updatedAccount);
    public Task<SavedJob> SaveJob(int jobId, int jobSeekerId);
    public Task<SavedJob> RemoveJobFromSaved(int jobId, int jobSeekerId);
}