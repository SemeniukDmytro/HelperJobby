using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IJobQueryRepository
{
    public Task<Job> GetJobById(int id, int employerAccountId);
    public Task<IEnumerable<Job>> GetJobsByUserId(int userId);
    public Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId);
}