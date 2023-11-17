using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IEducationQueryRepository
{
    public Task<Education> GetEducationById(int educationId);
    public Task<Education> GetEducationWithResume(int educationId);
}