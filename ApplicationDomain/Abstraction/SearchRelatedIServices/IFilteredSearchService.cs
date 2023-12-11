using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface IFilteredSearchService
{
    public Task<List<int>> SearchJobIdsByFilters(string query, bool isRemote, decimal pay, JobTypes jobType,
        string location, string language);
}