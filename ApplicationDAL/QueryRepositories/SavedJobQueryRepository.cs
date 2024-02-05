using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class SavedJobQueryRepository : ISavedJobQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public SavedJobQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }


    public async Task<SavedJob> GetSavedJobByJobIdAndJobSeekerId(int jobId, int jobSeekerId)
    {
        return await GetSavedJob(jobId, jobSeekerId);
    }

    public async Task<SavedJob> GetSavedJobWithJob(int jobId, int jobSeekerId)
    {
        return await GetSavedJob(jobId, jobSeekerId, q => q.Include(s => s.Job));
    }

    private async Task<SavedJob> GetSavedJob(int jobId, int jobSeekerId,
        Func<IQueryable<SavedJob>, IQueryable<SavedJob>> includeFunc = null)
    {
        var query = _applicationContext.SavedJobs.Where(j => j.JobId == jobId && j.JobSeekerId == jobSeekerId);

        if (includeFunc != null) query = includeFunc(query);

        var savedJob = await query.FirstOrDefaultAsync();

        if (savedJob == null) throw new JobNotFoundException("Saved job wasn't found");

        return savedJob;
    }
}