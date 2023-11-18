using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface ISavedJobQueryRepository
{
    public Task<SavedJob> GetSavedJobByJobAndUserIds(int jobId, int jobSeekerAccountId);
}