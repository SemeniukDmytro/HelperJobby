using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobSeekerQueryRepository : IJobSeekerQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobSeekerQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }


    public async Task<JobSeeker> GetJobSeekerById(int jobSeekerId)
    {
        return await GetJobSeeker(jobSeekerId);
    }

    public async Task<JobSeeker> GetJobSeekerByIdWithAddress(int jobSeekerId)
    {
        return await GetJobSeeker(jobSeekerId, q => q
            .Include(js => js.Address));
    }

    public async Task<JobSeeker> GetJobSeekerByIdWithAddressAndResume(int jobSeekerId)
    {
        return await GetJobSeeker(jobSeekerId, q => q
            .Include(js => js.Address).Include(js => js.Resume));
    }

    public async Task<JobSeeker> GetJobSeekerByIdWithJobInteractions(int jobSeekerId)
    {
        var retrievedJobSeeker = await _applicationContext.JobSeekers.Where(j => j.Id == jobSeekerId)
            .Select(js => new JobSeeker
            {
                Id = js.Id,
                Resume = js.Resume,
                JobApplies = js.JobApplies,
                SavedJobs = js.SavedJobs
            }).FirstOrDefaultAsync();
        if (retrievedJobSeeker == null) throw new JobSeekerNotFoundException();

        return retrievedJobSeeker;
    }

    public async Task<JobSeeker> GetJobSeekerByIdWithResume(int jobSeekerId)
    {
        return await GetJobSeeker(jobSeekerId, q => q
            .Include(js => js.Resume));
    }

    private async Task<JobSeeker> GetJobSeeker(int jobSeekerId,
        Func<IQueryable<JobSeeker>, IQueryable<JobSeeker>> includeFunc = null)
    {
        var query = _applicationContext.JobSeekers.AsQueryable();
        if (includeFunc != null) query = includeFunc(query);
        var jobSeeker = await query.FirstOrDefaultAsync(js => js.Id == jobSeekerId);
        if (jobSeeker == null) throw new JobSeekerNotFoundException();
        return jobSeeker;
    }
}