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
    

    public async Task<SavedJob> GetSavedJobByJobAndUserIds(int jobId, int jobSeekerAccountId)
    {
        var savedJob =
            await _applicationContext.SavedJobs.FirstOrDefaultAsync(j => j.JobId == jobId && j.JobSeekerAccountId == jobSeekerAccountId);
        if (savedJob == null)
        {
            throw new JobSavingException("Saved job wasn't found");
        }

        return savedJob;
    }
}