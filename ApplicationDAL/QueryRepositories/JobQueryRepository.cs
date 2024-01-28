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

    private const int RandomJobsToTake = 10;

    public JobQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
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
        var jobs = await _applicationContext.Jobs.Where(j => j.EmployerAccount.UserId == userId).ToListAsync();
        return jobs;
    }
    
    
    public async Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId)
    {
        var jobs = await _applicationContext.Jobs.Where(j => j.EmployerAccount.OrganizationId == organizationId)
            .ToListAsync();

        return jobs;
    }

    public async Task<IEnumerable<Job>> GetJobsByJobIds(List<int> jobIds)
    {
        var jobs = await _applicationContext
            .Jobs.Where(j => jobIds.Contains(j.Id)).
            Select(JobProjections.JobWithOrganizationName())
            .ToListAsync();
        return jobs;
    }

    public async Task<Job> GetJobWithJobApplies(Job job)
    {
        await _applicationContext.Entry(job).Collection(j => j.JobApplies).LoadAsync();
        return job;
    }

    public async Task<Job> GetJobWithInterviews(Job job)
    {
        await _applicationContext.Entry(job).Collection(j => j.Interviews).LoadAsync();
        return job;
    }

    public async Task<IEnumerable<Job>> GetRandomJobs()
    {
        var jobsCount = _applicationContext.Jobs.Count();
        var startingPoint = Math.Max(new Random().Next(jobsCount) - 10, 0);
        return await _applicationContext.Jobs.Skip(startingPoint).Take(RandomJobsToTake).
            Select(JobProjections.JobWithOrganizationName())
            .ToListAsync();
    }

    public async Task<Job> GetJobWithOrganizationInfo(int jobId)
    {
        var jobs = await _applicationContext
            .Jobs.Where(j => j.Id == jobId)
            .Select(JobProjections.JobWithOrganizationName())
            .FirstOrDefaultAsync();
        return jobs;
    }
}