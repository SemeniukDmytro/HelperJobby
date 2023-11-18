using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface ICurrentJobCreationService
{
    public Task<CurrentJobCreation> StartJobCreation(CurrentJobCreation currentJobCreation);

    public Task<CurrentJobCreation> UpdateCurrentJob(int jobId, int employerId, CurrentJobCreation currentJobCreation);

    public Task<CurrentJobCreation> DeleteCurrentJob(int jobId, int employerAccountId);
}