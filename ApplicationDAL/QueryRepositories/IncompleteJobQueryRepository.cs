using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class IncompleteJobQueryRepository : IIncompleteJobQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public IncompleteJobQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<IncompleteJob> GetIncompleteJobById(int incompleteJobId)
    {
        return await GetCurrentJob(incompleteJobId);
    }

    public async Task<IncompleteJob> GetIncompleteJobByEmployerId(int employerId)
    {
        var jobEntity =
            await _applicationContext.IncompleteJobs.Include(j=> j.Salary)
                .FirstOrDefaultAsync(j => j.EmployerId == employerId);
        if (jobEntity == null) throw new JobNotFoundException("There isn't any previous job creations");

        return jobEntity;
    }

    public async Task<IncompleteJob> GetIncompleteJobWithEmployer(int incompleteJobId)
    {
        return await GetCurrentJob(incompleteJobId, q => q.Include(j => j.Employer));
    }

    private async Task<IncompleteJob> GetCurrentJob(int jobCreationId,
        Func<IQueryable<IncompleteJob>, IQueryable<IncompleteJob>> includeQuery = null)
    {
        var query = _applicationContext.IncompleteJobs.AsQueryable();

        if (includeQuery != null) query = includeQuery(query);

        var currenJobEntity = await query.Include(j => j.Salary)
            .FirstOrDefaultAsync(j => j.Id == jobCreationId);

        if (currenJobEntity == null) throw new JobNotFoundException("Job with specified id doesn't exist");

        return currenJobEntity;
    }
}