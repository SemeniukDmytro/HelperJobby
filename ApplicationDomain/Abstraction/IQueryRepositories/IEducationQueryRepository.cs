using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IEducationQueryRepository
{
    public Task<Education> GetEducationById(int educationId);
    public Task<Education> GetEducationWithResume(int educationId);
}