using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobSeekerAccountQueryRepository
{
    public Task<JobSeekerAccount> GetJobSeekerAccountByUserId(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithResume(int userId);
    public Task<JobSeekerAccount> GetJobSeekerWithJobInteractions(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithAddress(int userId);
    public Task<JobSeekerAccount> GetJobSeekerAccountWithAddressAndResume(int userId);
    public Task<IEnumerable<SavedJob>> GetJobSeekerSavedJobs(int userId);
    public Task<IEnumerable<JobApply>> GetJobSeekerAccountWithJobApplies(int userId);
    public Task<IEnumerable<Interview>> GetJobSeekerAccountWithInterviews(int userId);
}