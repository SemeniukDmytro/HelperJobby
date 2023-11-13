using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
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

    public async Task<CurrentJobCreation> UpdateCurrenJob(CurrentJobCreation jobCreation)
    {
        await _applicationContext.SaveChangesAsync();
        return jobCreation;
    }

    public async Task DeleteCurrentJob(CurrentJobCreation jobCreation)
    {
        _applicationContext.CurrentJobCreations.Remove(jobCreation);
        await _applicationContext.SaveChangesAsync();
    }

}