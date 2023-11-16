using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class JobSeekerAccountQueryRepository : IJobSeekerAccountQueryRepository
{
    public Task<JobSeekerAccount> GetJobSeekerAccountByUserId(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<JobSeekerAccount> GetJobSeekerAccountWithSavedJobs(int userId)
    {
        throw new NotImplementedException();
    }

    public Task<JobSeekerAccount> GetJobSeekerAccountWithAddress(int userId)
    {
        throw new NotImplementedException();
    }
}