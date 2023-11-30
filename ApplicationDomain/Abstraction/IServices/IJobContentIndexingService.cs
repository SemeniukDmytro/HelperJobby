using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IJobContentIndexingService
{
    public Task IndexJobContent(Job job);

    public Task UpdateAndIndexJobContent(Job job);

    public Task DeleteIndexedJobContent(Job job);
    
}