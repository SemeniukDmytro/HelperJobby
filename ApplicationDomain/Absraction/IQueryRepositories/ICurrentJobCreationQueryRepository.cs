using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface ICurrentJobCreationQueryRepository
{
    public Task<CurrentJobCreation> GetJobCreationById(int jobCreationId);
    public Task<CurrentJobCreation> GetJobCreationWithEmployerAccount(int jobCreationId);
}