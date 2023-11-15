using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IJobSeekerAccountQueryRepository
{
    public Task<JobSeekerAccount> GetJobSeekerAccountByUserId(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithSavedJobs(int userId);
}