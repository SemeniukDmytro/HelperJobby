using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface ICurrentJobCreationQueryRepository
{
    public Task<CurrentJobCreation> GetJobCreationById(int jobCreationId, int employerAccountId);
    public Task<CurrentJobCreation> GetJobCreationByEmployerId(int employerId);
    public Task<CurrentJobCreation> GetJobCreationWithEmployerAccount(int jobCreationId, int employerAccountId);
}