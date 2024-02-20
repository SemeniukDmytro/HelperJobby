using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IJobQueryRepository
{
    public Task<Job> GetJobByIdForEmployers(int jobId);
    public Task<Job> GetJobByIdWithEmployer(int jobId);
    public Task<IEnumerable<Job>> GetJobsByEmployerId(int employerId);
    public Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId);
    public Task<IEnumerable<Job>> GetJobsByJobIds(List<int> jobIds);
    public Task<Job> GetJobWithJobApplies(int jobId);
    public Task<Job> GetJobWithInterviews(int jobId);
    public Task<IEnumerable<Job>> GetRandomJobs();
    public Task<Job> GetJobByIdForJobSeekers(int jobId);
    public Task<List<Job>> GetJobsByIdsForEmployer(List<int> jobIds);
}