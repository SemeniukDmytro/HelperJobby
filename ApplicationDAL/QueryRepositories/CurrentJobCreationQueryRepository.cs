using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class CurrentJobCreationQueryRepository : ICurrentJobCreationQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public CurrentJobCreationQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<CurrentJobCreation> GetJobCreationById(int jobCreationId)
    {
        return await GetJob(jobCreationId);
    }

    public async Task<CurrentJobCreation> GetJobCreationWithEmployerAccount(int jobCreationId)
    {
        return await GetJob(jobCreationId, q => q.Include(j => j.EmployerAccount));
    }
    
    private  async Task<CurrentJobCreation> GetJob(int jobCreationId, Func<IQueryable<CurrentJobCreation>, IQueryable<CurrentJobCreation>> includeQuery=null)
    {
        var query = _applicationContext.CurrentJobCreations.AsQueryable();

        if (includeQuery != null)
        {
            query = includeQuery(query);
        }

        var jobEntity = await query.FirstOrDefaultAsync(j => j.Id == jobCreationId);

        if (jobEntity == null)
        {
            throw new JobNotFoundException("User with specified id doesn't exist");
        }

        return jobEntity;
    }
}