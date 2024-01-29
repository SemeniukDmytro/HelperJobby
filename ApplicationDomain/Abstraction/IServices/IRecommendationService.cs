using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IRecommendationService
{
    public Task<IEnumerable<int>> GetJobsBasedOnPreviousUserSearches();
}