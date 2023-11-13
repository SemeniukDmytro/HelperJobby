using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface ICurrentJobCreationCommandRepository
{
    public Task<CurrentJobCreation> CreateCurrentJob(CurrentJobCreation jobCreation);
    public Task<CurrentJobCreation> UpdateCurrenJob(CurrentJobCreation jobCreation);
    public Task DeleteCurrentJob(CurrentJobCreation jobCreation);
}