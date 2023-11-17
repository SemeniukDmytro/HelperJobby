using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobSeekerAccountQueryRepository : IJobSeekerAccountQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly CustomQueryIncluder _customQueryIncluder;

    public JobSeekerAccountQueryRepository(ApplicationContext applicationContext, CustomQueryIncluder customQueryIncluder)
    {
        _applicationContext = applicationContext;
        _customQueryIncluder = customQueryIncluder;
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountByUserId(int userId)
    {
        var jobSeekerAccount = await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeekerAccount));
        return jobSeekerAccount;
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithResume(int userId)
    {
        return await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeekerAccount)
            .ThenInclude(a => a.Resume));
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithSavedJobs(int userId)
    {
        var jobSeekerAccount = await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeekerAccount));
        await _applicationContext.Entry(jobSeekerAccount).Collection(a => a.SavedJobs).LoadAsync();
        return jobSeekerAccount;
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithAddress(int userId)
    {
        return await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeekerAccount)
            .ThenInclude(a => a.Address));
    }
    
    private async Task<JobSeekerAccount> GetUserWithJobSeekerAccount(int userId, Func<IQueryable<User>, IQueryable<User>> includeFunc = null)
    {
        var query = _applicationContext.Users.AsQueryable();
        if (includeFunc != null)
        {
            query = includeFunc(query);
        }
        var user = await _customQueryIncluder.GetUser(userId, includeFunc);
        var account = user.JobSeekerAccount;
        return account;
    }
}