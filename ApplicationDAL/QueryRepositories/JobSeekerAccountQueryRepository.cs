using System.Collections;
using System.Linq.Expressions;
using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
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
    
    public async Task<JobSeekerAccount> GetJobSeekerAccountWithAddress(int userId)
    {
        return await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeekerAccount)
            .ThenInclude(a => a.Address));
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithSavedJobs(int userId)
    {
        return await GetJobSeekerAccountWithCollectionAsync(userId, a => a.SavedJobs);
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithJobApplies(int userId)
    {
        return await GetJobSeekerAccountWithCollectionAsync(userId, a => a.JobApplies);
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithInterviews(int userId)
    {
        return await GetJobSeekerAccountWithCollectionAsync(userId, a => a.Interviews);
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
    
    private async Task<JobSeekerAccount> GetJobSeekerAccountWithCollectionAsync<T>(
        int userId, 
        Expression<Func<JobSeekerAccount, IEnumerable<T>>> collectionProperty) where T : class
    {
        var jobSeekerAccount = await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeekerAccount));
        await _applicationContext.Entry(jobSeekerAccount).Collection(collectionProperty).LoadAsync();
        return jobSeekerAccount;
    }
}