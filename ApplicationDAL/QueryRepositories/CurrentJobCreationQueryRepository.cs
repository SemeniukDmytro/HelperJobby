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

    public async Task<CurrentJobCreation> GetJobCreationById(int jobCreationId, int employerAccountId)
    {
        return await GetCurrentJob(jobCreationId, employerAccountId);
    }

    public async Task<CurrentJobCreation> GetJobCreationByEmployerId(int employerId)
    {
        var jobEntity =
            await _applicationContext.CurrentJobCreations.FirstOrDefaultAsync(j => j.EmployerAccountId == employerId);
        if (jobEntity == null)
        {
            throw new JobNotFoundException("There isn't any previous job creations");
        }

        return jobEntity;
    }

    public async Task<CurrentJobCreation> GetJobCreationWithEmployerAccount(int jobCreationId, int employerAccountId)
    {
        return await GetCurrentJob(jobCreationId, employerAccountId, q => q.Include(j => j.EmployerAccount));
    }
    
    private  async Task<CurrentJobCreation> GetCurrentJob(int jobCreationId, int employerAccountId, Func<IQueryable<CurrentJobCreation>, IQueryable<CurrentJobCreation>> includeQuery=null)
    {
        var query = _applicationContext.CurrentJobCreations.AsQueryable();

        if (includeQuery != null)
        {
            query = includeQuery(query);
        }

        var currenJobEntity = await query.FirstOrDefaultAsync(j => j.Id == jobCreationId);

        if (currenJobEntity == null)
        {
            throw new JobNotFoundException("Job with specified id doesn't exist");
        }

        if (currenJobEntity.EmployerAccountId != employerAccountId)
        {
            throw new ForbiddenException();
        }

        return currenJobEntity;
    }
}