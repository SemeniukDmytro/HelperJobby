using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

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
            _applicationContext.SavedJobs.FirstOrDefault(j => j.JobId == jobId && j.JobSeekerAccountId == jobSeekerAccountId);
        if (savedJob == null)
        {
            throw new JobSavingException("Job with such ids does not exist");
        }

        return savedJob;
    }
}