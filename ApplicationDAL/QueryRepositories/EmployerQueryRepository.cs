using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class EmployerQueryRepository : IEmployerQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public EmployerQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }
    
    public async Task<Employer> GetEmployerById(int employerId)
    {
        return  await GetEmployerAccount(employerId);;
    }

    public async Task<Employer> GetEmployerByIdWithOrganization(int employerId)
    {
        return await GetEmployerAccount(employerId, q => q.Include(e => e.Organization));
    }

    private async Task<Employer> GetEmployerAccount(int employerId,
        Func<IQueryable<Employer>, IQueryable<Employer>> includeFunc = null)
    {
        var query = _applicationContext.Employers.AsQueryable();
        query = includeFunc == null ? query : includeFunc(query);
        var employer = await query.FirstOrDefaultAsync(e => e.Id == employerId);

        if (employer == null) throw new EmployerAccountNotFoundException();

        return employer;
    }
}