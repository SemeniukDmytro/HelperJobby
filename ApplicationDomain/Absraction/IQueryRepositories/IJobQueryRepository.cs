using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IJobQueryRepository
{
    public Task<Job> GetJobById(int id, int employerAccountId);
}