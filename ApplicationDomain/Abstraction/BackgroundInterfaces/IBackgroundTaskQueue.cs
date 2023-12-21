namespace ApplicationDomain.Abstraction.BackgroundInterfaces;

public interface IBackgroundTaskQueue
{
    public void QueueBackgroundWorkItem(Func<CancellationToken, Task> workItem);  
  
    public Task<Func<CancellationToken, Task>> DequeueAsync(  
        CancellationToken cancellationToken);
}