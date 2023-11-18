using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobSeekerAccountQueryRepository
{
    public Task<JobSeekerAccount> GetJobSeekerAccountByUserId(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithResume(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithAddress(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithSavedJobs(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithJobApplies(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithInterviews(int userId);
}