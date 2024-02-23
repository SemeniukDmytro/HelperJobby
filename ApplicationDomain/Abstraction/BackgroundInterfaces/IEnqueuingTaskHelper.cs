using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;

namespace ApplicationDomain.Abstraction.BackgroundInterfaces;

public interface IEnqueuingTaskHelper
{
    public Task EnqueueJobIndexingTaskAsync(Func<IJobContentIndexingService, Task> indexingAction);
    public Task EnqueueResumeIndexingTaskAsync(Func<IResumeContentIndexingService, Task> indexingAction);

    public Task EnqueueAddingRecentSearchTask(Func<IRecentUserSearchService, Task> addingRecentSearchAction);
}