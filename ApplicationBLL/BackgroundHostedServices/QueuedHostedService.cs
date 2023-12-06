using ApplicationDomain.Abstraction.BackgroundInterfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ApplicationBLL.BackgroundHostedServices;

public class QueuedHostedService : BackgroundService
{
    private readonly ILogger _logger;
    private readonly IBackgroundTaskQueue _taskQueue;

  
    public QueuedHostedService(IBackgroundTaskQueue taskQueue,  
        ILoggerFactory loggerFactory)  
    {  
        _taskQueue = taskQueue;  
        _logger = loggerFactory.CreateLogger<QueuedHostedService>();  
    }  
  
  
    protected override async Task ExecuteAsync(  
        CancellationToken cancellationToken)  
    {  
        _logger.LogInformation("Queued Hosted Service is starting.");  
  
        while (!cancellationToken.IsCancellationRequested)  
        {  
            var workItem = await _taskQueue.DequeueAsync(cancellationToken);  
  
            try  
            {  
                await workItem(cancellationToken);  
            }  
            catch (Exception ex)  
            {  
                _logger.LogError(ex,  
                    "Error occurred executing {WorkItem}.", nameof(workItem));  
            }  
        }  
  
        _logger.LogInformation("Queued Hosted Service is stopping.");  
    }  
}