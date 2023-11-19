using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface ISavedJobQueryRepository
{
    public Task<SavedJob> GetSavedJobByJobIdAndJobSeekerId(int jobId, int jobSeekerAccountId);
    public Task<SavedJob> GetSavedJobWithJob(int jobId, int jobSeekerAccountId);
}