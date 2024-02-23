using System.Collections.Concurrent;
using ApplicationDomain.Abstraction.BackgroundInterfaces;

namespace ApplicationBLL.BackgroundHostedServices;

public class BackgroundTaskQueue : IBackgroundTaskQueue
{
    private readonly SemaphoreSlim _signal = new(0);

    private readonly ConcurrentQueue<Func<CancellationToken, Task>> _workItems = new();

    public void QueueBackgroundWorkItem(
        Func<CancellationToken, Task> workItem)
    {
        if (workItem == null) throw new ArgumentNullException(nameof(workItem));

        _workItems.Enqueue(workItem);
        _signal.Release();
    }

    public async Task<Func<CancellationToken, Task>> DequeueAsync(
        CancellationToken cancellationToken)
    {
        await _signal.WaitAsync(cancellationToken);
        _workItems.TryDequeue(out var workItem);

        return workItem;
    }
}