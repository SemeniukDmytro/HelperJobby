using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface ISavedJobCommandRepository
{
    public Task<SavedJob> CreateSavedJob(SavedJob savedJob);
    public Task DeleteSavedJob(SavedJob savedJob);
}