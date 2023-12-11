using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using Microsoft.Extensions.DependencyInjection;

namespace ApplicationBLL.BackgroundHostedServices;

public class EnqueuingTaskHelper : IEnqueuingTaskHelper
{
    private readonly IBackgroundTaskQueue _backgroundTaskQueue;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public EnqueuingTaskHelper(IBackgroundTaskQueue backgroundTaskQueue, IServiceScopeFactory serviceScopeFactory)
    {
        _backgroundTaskQueue = backgroundTaskQueue;
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task EnqueueJobIndexingTaskAsync(Func<IJobContentIndexingService, Task> indexingAction)
    {
        _backgroundTaskQueue.QueueBackgroundWorkItem(async token =>
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var jobContentIndexingService = serviceProvider.GetRequiredService<IJobContentIndexingService>();
                await indexingAction(jobContentIndexingService);
            }
        });
    }

    public async Task EnqueueResumeIndexingTaskAsync(Func<IResumeContentIndexingService, Task> indexingAction)
    {
        _backgroundTaskQueue.QueueBackgroundWorkItem(async token =>
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var resumeContentIndexingService = serviceProvider.GetRequiredService<IResumeContentIndexingService>();
                await indexingAction(resumeContentIndexingService);
            }
        });
    }
}