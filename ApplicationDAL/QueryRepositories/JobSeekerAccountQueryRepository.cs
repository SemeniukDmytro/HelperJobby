using ApplicationDAL.Context;
using ApplicationDAL.DALHelpers;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobSeekerAccountQueryRepository : IJobSeekerAccountQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly EntityInclusionHandler _entityInclusionHandler;

    public JobSeekerAccountQueryRepository(ApplicationContext applicationContext, EntityInclusionHandler entityInclusionHandler)
    {
        _applicationContext = applicationContext;
        _entityInclusionHandler = entityInclusionHandler;
    }

    public async Task<JobSeekerAccount> GetJobSeekerAccountByUserId(int userId)
    {
        var jobSeekerAccount =
            await _applicationContext.JobSeekerAccounts.Where(j => j.UserId == userId).FirstOrDefaultAsync();
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

    public async Task<JobSeekerAccount> GetJobSeekerAccountWithAddressAndResume(int userId)
    {
        var jobSeekerAccount =
            await _applicationContext.JobSeekerAccounts.Where(j => j.UserId == userId)
                .Select(j => new JobSeekerAccount()
                {
                    Id = j.Id,
                    FirstName = j.FirstName,
                    LastName = j.LastName,
                    AddressId = j.AddressId,
                    Address = j.Address,
                    Resume = j.Resume,
                    PhoneNumber = j.PhoneNumber
                }).FirstOrDefaultAsync();
        return jobSeekerAccount;
    }


    public async Task<IEnumerable<Job>> GetJobSeekerAccountWithJobApplies(int userId)
    {
        var jobApplies = await _applicationContext.Users
            .Where(u => u.Id == userId)
            .SelectMany(u => u.JobSeekerAccount.JobApplies
                .Select(sj => sj.Job)
                .Select(sj => new Job
                {
                    Id = sj.Id,
                    JobTitle = sj.JobTitle,
                    Salary = sj.Salary,
                    Schedule = sj.Schedule,
                    Location = sj.Location,
                    JobApplies = sj.JobApplies
                        .Select(j => new JobApply()
                        {
                            DateTime = j.DateTime
                        })
                        .ToList()
                }))
            .ToListAsync();
        return jobApplies;
    }

    public async Task<IEnumerable<Job>> GetJobSeekerAccountWithInterviews(int userId)
    {
       var interviews = await _applicationContext.Users
            .Where(u => u.Id == userId)
            .SelectMany(u => u.JobSeekerAccount.Interviews
                .Select(sj => sj.Job)
                .Select(sj => new Job
                {
                    Id = sj.Id,
                    JobTitle = sj.JobTitle,
                    Salary = sj.Salary,
                    Schedule = sj.Schedule,
                    Location = sj.Location,
                    Interviews = sj.Interviews
                        .Select(i => new Interview
                        {
                            DateTime = i.DateTime
                        })
                        .ToList()
                }))
            .ToListAsync();
    return interviews;
    }
    

    private async Task<JobSeekerAccount> GetUserWithJobSeekerAccount(int userId, Func<IQueryable<User>, IQueryable<User>> includeFunc = null)
    {
        var query = _applicationContext.Users.AsQueryable();
        if (includeFunc != null)
        {
            query = includeFunc(query);
        }
        var user = await _entityInclusionHandler.GetUser(userId, includeFunc);
        var account = user.JobSeekerAccount;
        return account;
    }
    
}