using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class IncompleteJobCommandRepository : IIncompleteJobCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public IncompleteJobCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }


    public async Task<IncompleteJob> CreateIncompleteJob(IncompleteJob job)
    {
        _applicationContext.IncompleteJobs.Add(job);
        await _applicationContext.SaveChangesAsync();
        return job;
    }

    public async Task<IncompleteJob> UpdateIncompleteJob(IncompleteJob job)
    {
        _applicationContext.IncompleteJobs.Update(job);
        await _applicationContext.SaveChangesAsync();
        return job;
    }

    public async Task DeleteIncompleteJob(IncompleteJob job)
    {
        _applicationContext.IncompleteJobs.Remove(job);
        await _applicationContext.SaveChangesAsync();
    }
}