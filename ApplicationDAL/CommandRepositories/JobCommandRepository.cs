using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class JobCommandRepository : IJobCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Job> CreateJob(CurrentJobCreation currentJobCreation, Job createdJob)
    {
        _applicationContext.Jobs.Add(createdJob);
        _applicationContext.CurrentJobCreations.Remove(currentJobCreation);
        await _applicationContext.SaveChangesAsync();
        return createdJob;
    }

    public async Task<Job> UpdateJob(Job updatedJob)
    {
        _applicationContext.Jobs.Update(updatedJob);
        await _applicationContext.SaveChangesAsync();
        return updatedJob;
    }

    public async Task DeleteJob(Job job)
    {
        _applicationContext.Jobs.Remove(job);
        await _applicationContext.SaveChangesAsync();
    }
}