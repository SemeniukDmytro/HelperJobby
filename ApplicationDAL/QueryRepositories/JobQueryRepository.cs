using System.Linq.Expressions;
using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobQueryRepository : IJobQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;

    public JobQueryRepository(ApplicationContext applicationContext, IEmployerAccountQueryRepository employerAccountQueryRepository, 
        IOrganizationQueryRepository organizationQueryRepository)
    {
        _applicationContext = applicationContext;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _organizationQueryRepository = organizationQueryRepository;
    }

    public async Task<Job> GetJobById(int jobId)
    {
        var job = await _applicationContext.Jobs.FirstOrDefaultAsync(j => j.Id == jobId);
        if (job == null)
        {
            throw new JobNotFoundException();
        }

        return job;
    }

    public async Task<IEnumerable<Job>> GetJobsByUserId(int userId)
    {
        var employerAccount = await _employerAccountQueryRepository.GetEmployerAccount(userId);
        await _applicationContext.Entry(employerAccount).Collection(e => e.Jobs).LoadAsync();
        return employerAccount.Jobs;
    }
    
    public async Task<IEnumerable<Job>> GetJobSeekerSavedJobs(int userId)
    {
        var savedJobs = await _applicationContext.Users
            .Include(u => u.JobSeekerAccount)
            .ThenInclude(j => j.SavedJobs)
            .ThenInclude(s => s.Job)
            .Where(u => u.Id == userId)
            .SelectMany(u => u.JobSeekerAccount.SavedJobs.Select(sj => sj.Job).Select(sj => new Job()
            {
                Id = sj.Id,
                JobTitle = sj.JobTitle,
                Salary = sj.Salary,
                Schedule = sj.Schedule,
                Location = sj.Location
            }))
            .ToListAsync();
        return savedJobs;
    }
    public async Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId)
    {
        var organization = await _organizationQueryRepository.GetOrganizationWithEmployees(organizationId);
        List<Job> result = new List<Job>();
        foreach (var employerAccount in organization.EmployeeAccounts)
        {
            result.AddRange(await GetJobsByUserId(employerAccount.UserId));
        }

        return result;
    }

    public async Task<Job> GetJobWithJobApplies(int jobId)
    {
        return await GetJobWithCollectionAsync(jobId, j => j.JobApplies);
    }

    public async Task<Job> GetJobWithInterviews(int jobId)
    {
        return await GetJobWithCollectionAsync(jobId, j => j.Interviews);
    }


    private async Task<Job> GetJobWithCollectionAsync<T>(
        int jobId, 
        Expression<Func<Job, IEnumerable<T>>> collectionProperty) where T : class
    {
        var jobSeekerAccount = await GetJobById(jobId);
        await _applicationContext.Entry(jobSeekerAccount).Collection(collectionProperty).LoadAsync();
        return jobSeekerAccount;
    }
}