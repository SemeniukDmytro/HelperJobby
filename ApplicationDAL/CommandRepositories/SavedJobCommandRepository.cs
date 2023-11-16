using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class SavedJobCommandRepository : ISavedJobCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public SavedJobCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<SavedJob> CreateSavedJob(SavedJob savedJob)
    {
        _applicationContext.Entry(savedJob.Job).State = EntityState.Unchanged;
        _applicationContext.Entry(savedJob.JobSeekerAccount).State = EntityState.Unchanged;
        _applicationContext.SavedJobs.Add(savedJob);
        await _applicationContext.SaveChangesAsync();
        return savedJob;
    }

    public async Task DeleteSavedJob(SavedJob savedJob)
    {
        _applicationContext.SavedJobs.Remove(savedJob);
        await _applicationContext.SaveChangesAsync();
    }
}