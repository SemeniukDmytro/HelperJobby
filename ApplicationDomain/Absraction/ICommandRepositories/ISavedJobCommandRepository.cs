using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface ISavedJobCommandRepository
{
    public Task<SavedJob> CreateSavedJob(SavedJob savedJob);
    public Task DeleteSavedJob(SavedJob savedJob);
}