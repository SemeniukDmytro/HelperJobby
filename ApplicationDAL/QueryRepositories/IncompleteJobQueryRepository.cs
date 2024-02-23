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
        return await GetIncompleteJob(incompleteJobId);
    }

    public async Task<IEnumerable<IncompleteJob>> GetIncompleteJobsByEmployerId(int employerId)
    {
        var incompleteJobEntities =
            await _applicationContext.IncompleteJobs.Include(j=> j.Salary)
                .Where(j => j.EmployerId == employerId).ToListAsync();

        return incompleteJobEntities;
    }

    public async Task<IncompleteJob> GetIncompleteJobWithEmployer(int incompleteJobId)
    {
        return await GetIncompleteJob(incompleteJobId, q => q
            .Include(ij => ij.Employer));
    }

    public async Task<List<IncompleteJob>> GetIncompleteJobByIds(List<int> incompleteJobIds)
    {
        var jobs = await _applicationContext
            .IncompleteJobs.Where(j => incompleteJobIds.Contains(j.Id))
            .ToListAsync();
        return jobs;
    }

    private async Task<IncompleteJob> GetIncompleteJob(int jobCreationId,
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