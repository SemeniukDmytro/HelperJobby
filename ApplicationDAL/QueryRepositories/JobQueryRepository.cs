using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class JobQueryRepository : IJobQueryRepository
{
    public Task<Job> GetJobById(int id, int employerAccountId)
    {
        throw new NotImplementedException();
    }
}