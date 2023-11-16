using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IJobSeekerAccountService
{
    public Task<JobSeekerAccount> UpdateJobSeekerAccount(int userId, JobSeekerAccount updatedAccount);
    public Task<SavedJob> SaveJob(int jobId, int userId);
    public Task<SavedJob> RemoveJobFromSaved(int jobId, int userId);
}