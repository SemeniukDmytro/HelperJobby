using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface IJobContentIndexingService
{
    public Task IndexJobContent(Job job);

    public Task UpdateAndIndexJobContent(Job job);

    public Task RemoveIndexedJobContent(Job job);
    
}