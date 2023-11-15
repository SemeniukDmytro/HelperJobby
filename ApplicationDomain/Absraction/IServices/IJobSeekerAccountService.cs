using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IJobSeekerAccountService
{
    public Task<JobSeekerAccount> UpdateJobSeekerAccount(int id, JobSeekerAccount updatedAccount);
    public Task SaveJob(int jobId, int jobSeekerAccountId);
    public Task RemoveJobFromSaved(int jobId, int jobSeekerAccountId);
}