using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.BackgroundInterfaces;

public interface IEnqueuingTaskHelper
{
    public Task EnqueueJobIndexingTaskAsync(Func<IJobContentIndexingService, Task> indexingAction);
    public Task EnqueueResumeIndexingTaskAsync(Func<IResumeContentIndexingService, Task> indexingAction);

}