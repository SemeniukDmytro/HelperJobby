using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface ICurrentJobCreationQueryRepository
{
    public Task<CurrentJobCreation> GetJobCreationById(int jobCreationId);
    public Task<CurrentJobCreation> GetJobCreationByEmployerId(int employerId);
    public Task<CurrentJobCreation> GetJobCreationWithEmployerAccount(int jobCreationId);
}