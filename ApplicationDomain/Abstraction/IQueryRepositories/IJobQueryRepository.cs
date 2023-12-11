using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobQueryRepository
{
    public Task<Job> GetJobById(int jobId);
    public Task<IEnumerable<Job>> GetJobsByUserId(int userId);
    public Task<IEnumerable<Job>> GetJobSeekerSavedJobs(int userId);
    public Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId);
    public Task<IEnumerable<Job>> GetJobsByJobIds(List<int> jobIds);
    public Task<Job> GetJobWithJobApplies(Job job);
    public Task<Job> GetJobWithInterviews(Job job);
}