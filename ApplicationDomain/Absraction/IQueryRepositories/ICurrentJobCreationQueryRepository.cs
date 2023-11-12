using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface ICurrentJobCreationQueryRepository
{
    public Task<CurrentJobCreation> GetJobCreationById(int JobCreationId, int userId);
}