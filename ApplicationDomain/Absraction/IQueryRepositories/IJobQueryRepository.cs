using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IJobQueryRepository
{
    public Task<Job> GetJobForEmployersById(int id, int employerAccountId);
    public Task<Job> GetJobById(int jobId);
    public Task<IEnumerable<Job>> GetJobsByUserId(int userId);
    public Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId);
}