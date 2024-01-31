using ApplicationDAL.Context;
using ApplicationDAL.DALHelpers;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class EmployerAccountQueryRepository : IEmployerAccountQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly EntityInclusionHandler _entityInclusionHandler;

    public EmployerAccountQueryRepository(ApplicationContext applicationContext,
        EntityInclusionHandler entityInclusionHandler)
    {
        _applicationContext = applicationContext;
        _entityInclusionHandler = entityInclusionHandler;
    }

    public async Task<EmployerAccount> GetEmployerAccount(int userId)
    {
        return await GetUserWithEmployerAccount(userId, q => q.Include(u => u.EmployerAccount));
    }

    public async Task<EmployerAccount> GetEmployerAccountWithOrganization(int userId)
    {
        var employerWithOrganization = await _applicationContext.EmployerAccounts
            .Where(e => e.UserId == userId)
            .Select(ea => new EmployerAccount()
            {
                Id = ea.Id,
                Email = ea.Email,
                FullName = ea.FullName,
                ContactNumber = ea.ContactNumber,
                UserId = ea.UserId,
                OrganizationId = ea.OrganizationId,
                Organization = ea.Organization
            }).FirstOrDefaultAsync();
        if (employerWithOrganization == null)
        {
            throw new EmployerAccountNotFoundException();
        }

        return employerWithOrganization;
    }

    public async Task<EmployerAccount> GetEmployerAccountWithCurrentJobCreation(int userId)
    {
        return await GetUserWithEmployerAccount(userId,
            q => q.Include(u => u.EmployerAccount).ThenInclude(ea => ea.CurrentJobCreation));
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

    private async Task<EmployerAccount> GetUserWithEmployerAccount(int userId,
        Func<IQueryable<User>, IQueryable<User>> includeFunc = null)
    {
        var user = await _entityInclusionHandler.GetUser(userId, includeFunc);
        var account = user.EmployerAccount;

        if (account == null) throw new EmployerAccountNotFoundException();

        return account;
    }
}