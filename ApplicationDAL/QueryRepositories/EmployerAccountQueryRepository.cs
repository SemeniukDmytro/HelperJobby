using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace ApplicationDAL.QueryRepositories;

public class EmployerAccountQueryRepository : IEmployerAccountQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly CustomQueryIncluder _customQueryIncluder;

    public EmployerAccountQueryRepository(ApplicationContext applicationContext, CustomQueryIncluder customQueryIncluder)
    {
        _applicationContext = applicationContext;
        _customQueryIncluder = customQueryIncluder;
    }

    public async Task<EmployerAccount> GetEmployerAccount(int userId)
    {
        return await GetUserWithEmployerAccount(userId, q => q.Include(u => u.EmployerAccount));
    }

    public async Task<EmployerAccount> GetEmployerAccountWithOrganization(int userId)
    {
        return await GetUserWithEmployerAccount(userId, q => q.Include(u => u.EmployerAccount).ThenInclude(ea => ea.Organization));
    }

    public async Task<EmployerAccount> GetEmployerAccountWithCurrentJobCreation(int userId)
    {
        return await GetUserWithEmployerAccount(userId, q => q.Include(u => u.EmployerAccount).ThenInclude(ea => ea.CurrentJobCreation));
    }

    public async Task<EmployerAccount> GetEmployerAccountOrganizationAndJobCreation(int userId)
    {
        return await GetUserWithEmployerAccount(userId, q => q
            .Include(u => u.EmployerAccount)
            .ThenInclude(ea => ea.Organization)
            .Include(u => u.EmployerAccount)
            .ThenInclude(ea => ea.CurrentJobCreation)
        );
    }

    public async Task<EmployerAccount> GetEmployerWithJobs(int userId)
    {
        var employerAccount = await GetUserWithEmployerAccount(userId, q => q.Include(u => u.EmployerAccount));
        await _applicationContext.Entry(employerAccount).Collection(e => e.Jobs).LoadAsync();
        return employerAccount;
    }

    private async Task<EmployerAccount> GetUserWithEmployerAccount(int userId, Func<IQueryable<User>, IQueryable<User>> includeFunc = null)
    {
        var user = await _customQueryIncluder.GetUser(userId, includeFunc);
        var account = user.EmployerAccount;

        if (account == null)
        {
            throw new EmployerAccountNotFoundException();
        }

        return account;
    }

}