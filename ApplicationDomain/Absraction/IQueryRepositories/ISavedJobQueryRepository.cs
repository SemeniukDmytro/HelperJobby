using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface ISavedJobQueryRepository
{
    public Task<SavedJob> GetSavedJobByJobAndUserIds(int jobId, int jobSeekerAccountId);
}