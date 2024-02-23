using ApplicationDomain.Enums;

namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface ISearchService
{
    public Task<(List<int> jobIds, bool hasMoreResults)> FindJobIds(string query, string location,
        int numberOfResultsToSkip,
        bool isRemote, decimal payPerHour, JobTypes jobType, string language);

    public Task<(List<int> resumeIds, bool hasMoreResults)> FindResumeIds(int numberOfResultsToSkip, string query);
}