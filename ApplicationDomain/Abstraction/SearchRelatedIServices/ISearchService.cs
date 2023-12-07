using ApplicationDomain.Enums;

namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface ISearchService
{
    public Task<List<int>> FindJobIds(string query, string location, int numberOfResultsToSkip, 
        bool isRemote, decimal pay, JobTypes jobType, string language);
    public Task<List<int>> FindResumeIds(int numberOfResultsToSkip, string query);
}