using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class CurrentJobCreationCommandRepository : ICurrentJobCreationCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public CurrentJobCreationCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }


    public async Task<CurrentJobCreation> CreateCurrentJob(CurrentJobCreation jobCreation)
    {
        _applicationContext.CurrentJobCreations.Add(jobCreation);
        await _applicationContext.SaveChangesAsync();
        return jobCreation;
    }

    public async Task<CurrentJobCreation> UpdateCurrentJob(CurrentJobCreation jobCreation)
    {
        _applicationContext.CurrentJobCreations.Update(jobCreation);
        await _applicationContext.SaveChangesAsync();
        return jobCreation;
    }

    public async Task DeleteCurrentJob(CurrentJobCreation jobCreation)
    {
        _applicationContext.CurrentJobCreations.Remove(jobCreation);
        await _applicationContext.SaveChangesAsync();
    }

}