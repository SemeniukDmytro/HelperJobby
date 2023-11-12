using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface ICurrentJobCreationService
{
    public Task StartJobCreation(CurrentJobCreation currentJobCreation);

    public Task UpdateCurrentJob(int userId, CurrentJobCreation currentJobCreation);

    public Task DeleteCurrenJob(int userId);
}