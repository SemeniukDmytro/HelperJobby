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
        return await _applicationContext.JobSeekerAccounts.Where(j => j.UserId == userId)
            .Select(js => new JobSeekerAccount()
            {
                Id = js.Id,
                UserId = js.UserId,
                Resume = js.Resume != null ? new Resume()
                {
                    Id = js.Resume.Id,
                    WorkExperiences = js.Resume.WorkExperiences,
                    Educations = js.Resume.Educations,
                    Skills = js.Resume.Skills,
                    JobSeekerAccountId = js.Resume.JobSeekerAccountId
                } : null
            }).FirstOrDefaultAsync();
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
                    PhoneNumber = j.PhoneNumber,
                    UserId = j.UserId
                }).FirstOrDefaultAsync();
        return jobSeekerAccount;
    }
    
    public async Task<IEnumerable<SavedJob>> GetJobSeekerSavedJobs(int userId)
    {
        var savedJobs = await _applicationContext.SavedJobs
            .Where(sj => sj.JobSeekerAccount.UserId == userId)
            .Select(sj => new SavedJob()
            {
                JobId = sj.JobId,
                JobSeekerAccountId = sj.JobSeekerAccountId,
                Job = new Job()
                {
                    Id = sj.JobId,
                    JobTitle = sj.Job.JobTitle,
                    EmployerAccount = new EmployerAccount()
                    {
                        Id = sj.Job.EmployerAccountId,
                        Organization = new Organization()
                        {
                            Id = sj.Job.EmployerAccount.OrganizationId,
                            Name = sj.Job.EmployerAccount.Organization.Name
                        }
                    },
                    Location = sj.Job.Location
                },
                DateSaved = sj.DateSaved
            }).ToListAsync();
        return savedJobs;
    }


    public async Task<IEnumerable<JobApply>> GetJobSeekerAccountWithJobApplies(int userId)
    {
        var jobApplies = await _applicationContext.JobApplies.Where(i => i.JobSeekerAccount.UserId == userId)
            .Select(ja => new JobApply()
            {
                JobId = ja.JobId,
                JobSeekerAccountId = ja.JobSeekerAccountId,
                DateApplied = ja.DateApplied,
                Job = new Job()
                {
                    Id = ja.JobId,
                    JobTitle = ja.Job.JobTitle,
                    EmployerAccount = new EmployerAccount()
                    {
                        Id = ja.Job.EmployerAccountId,
                        Organization = new Organization()
                        {
                            Id = ja.Job.EmployerAccount.OrganizationId,
                            Name = ja.Job.EmployerAccount.Organization.Name
                        }
                    },
                    Location = ja.Job.Location
                }
            }).ToListAsync();
        return jobApplies;
    }

    public async Task<IEnumerable<Interview>> GetJobSeekerAccountWithInterviews(int userId)
    {
       var interviews = await _applicationContext.Interviews.Where(i => i.JobSeekerAccount.UserId == userId)
           .Select(i => new Interview()
           {
               JobId = i.JobId,
               JobSeekerAccountId = i.JobSeekerAccountId,
               InterviewDate = i.InterviewDate,
               Job = new Job()
               {
                   Id = i.JobId,
                   JobTitle = i.Job.JobTitle,
                   EmployerAccount = new EmployerAccount()
                   {
                       Id = i.Job.EmployerAccountId,
                       Organization = new Organization()
                       {
                           Id = i.Job.EmployerAccount.OrganizationId,
                           Name = i.Job.EmployerAccount.Organization.Name
                       }
                   },
                   Location = i.Job.Location
               },
           }).ToListAsync();
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