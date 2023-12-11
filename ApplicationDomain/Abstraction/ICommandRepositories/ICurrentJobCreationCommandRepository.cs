using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface ICurrentJobCreationCommandRepository
{
    public Task<CurrentJobCreation> CreateCurrentJob(CurrentJobCreation jobCreation);
    public Task<CurrentJobCreation> UpdateCurrentJob(CurrentJobCreation jobCreation);
    public Task DeleteCurrentJob(CurrentJobCreation jobCreation);
}