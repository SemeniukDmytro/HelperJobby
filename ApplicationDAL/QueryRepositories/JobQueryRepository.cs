using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobQueryRepository : IJobQueryRepository
{
    private const int RandomJobsToTake = 10;
    private readonly ApplicationContext _applicationContext;

    public JobQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Job> GetJobByIdForEmployers(int jobId)
    {
        var job = await _applicationContext.Jobs.Include(j => j.Salary).FirstOrDefaultAsync(j => j.Id == jobId);
        if (job == null) throw new JobNotFoundException();

        return job;
    }

    public async Task<Job> GetJobByIdForJobSeekers(int jobId)
    {
        var job = await _applicationContext
            .Jobs.Where(j => j.Id == jobId)
            .Select(JobProjections.JobForJobSeekers())
            .FirstOrDefaultAsync();
        if (job == null) throw new JobNotFoundException();
        return job;
    }

    public async Task<List<Job>> GetJobsByIdsForEmployer(List<int> jobIds)
    {
        var jobs = await _applicationContext
            .Jobs.Where(j => jobIds.Contains(j.Id))
            .ToListAsync();
        return jobs;
    }

    public async Task<IEnumerable<Job>> GetEmployerJobTitles(int employerId)
    {
        var jobs = await _applicationContext.Jobs
            .Where(j => j.EmployerId == employerId).Select(j => new Job
            {
                Id = j.Id,
                JobTitle = j.JobTitle
            }).ToListAsync();
        return jobs;
    }

    public async Task<Job> GetJobByIdWithEmployer(int jobId)
    {
        var job = await _applicationContext.Jobs.Include(j => j.Salary)
            .Include(j => j.Employer).FirstOrDefaultAsync(j => j.Id == jobId);
        if (job == null) throw new JobNotFoundException();

        return job;
    }

    public async Task<IEnumerable<Job>> GetJobsByEmployerId(int employerId)
    {
        var jobs = await _applicationContext.Jobs
            .Include(j => j.Salary).Where(j => j.EmployerId == employerId).ToListAsync();
        return jobs;
    }


    public async Task<IEnumerable<Job>> GetJobsByOrganizationId(int organizationId)
    {
        var jobs = await _applicationContext.Jobs.Where(j => j.Employer.OrganizationId == organizationId)
            .Include(j => j.Salary).Select(JobProjections.JobForJobSeekers())
            .ToListAsync();

        return jobs;
    }

    public async Task<IEnumerable<Job>> GetJobsByJobIds(List<int> jobIds, int? currentEmployerId)
    {
        var jobs = await _applicationContext
            .Jobs.Where(j => jobIds.Contains(j.Id) && j.EmployerId != currentEmployerId)
            .Select(JobProjections.JobForJobSeekers())
            .ToListAsync();
        return jobs;
    }

    public async Task<Job> GetJobWithJobApplies(int jobId)
    {
        var jobEntity = await _applicationContext.Jobs.Where(j => j.Id == jobId)
            .Select(JobProjections.JobWithJobApplies()).FirstOrDefaultAsync();
        if (jobEntity == null) throw new JobNotFoundException();

        return jobEntity;
    }

    public async Task<Job> GetJobWithInterviews(int jobId)
    {
        var jobEntity = await _applicationContext.Jobs.Where(j => j.Id == jobId)
            .Select(JobProjections.JobWithInterviews()).FirstOrDefaultAsync();
        if (jobEntity == null) throw new JobNotFoundException();

        return jobEntity;
    }

    public async Task<IEnumerable<Job>> GetRandomJobs(int? currentEmployerId)
    {
        var jobsCount = _applicationContext.Jobs.Count();
        var startingPoint = Math.Max(new Random().Next(jobsCount) - 10, 0);
        return await _applicationContext.Jobs
            .Where(j => j.EmployerId != currentEmployerId)
            .Skip(startingPoint).Take(RandomJobsToTake)
            .Select(JobProjections.JobForJobSeekers())
            .ToListAsync();
    }
}