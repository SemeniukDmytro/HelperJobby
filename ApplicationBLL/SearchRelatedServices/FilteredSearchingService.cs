using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationBLL.SearchRelatedServices;

public class FilteredSearchingService : IFilteredSearchService
{
    public async Task<List<int>> SearchJobIdsByFilters(string query, bool isRemote, decimal pay, JobTypes jobType, string location, string language)
    {
        return new List<int>();
    }
    
    
}