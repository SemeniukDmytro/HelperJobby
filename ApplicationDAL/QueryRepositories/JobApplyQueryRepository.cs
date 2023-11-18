using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class JobApplyQueryRepository : IJobApplyQueryRepository
{
    public Task<JobApply> GetJobApplyByJobIdAndJobSeekerId(int jobId, int userId)
    {
        throw new NotImplementedException();
    }
}