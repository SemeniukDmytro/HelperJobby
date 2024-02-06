using ApplicationDAL.Context;
using ApplicationDAL.DALHelpers;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class EmployerQueryRepository : IEmployerQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly EntityInclusionHandler _entityInclusionHandler;

    public EmployerQueryRepository(ApplicationContext applicationContext,
        EntityInclusionHandler entityInclusionHandler)
    {
        _applicationContext = applicationContext;
        _entityInclusionHandler = entityInclusionHandler;
    }

    public async Task<Employer> GetEmployer(int userId)
    {
        return await GetUserWithEmployerAccount(userId, q => q.Include(u => u.Employer));
    }

    public async Task<Employer> GetEmployerWithOrganization(int userId)
    {
        var employerWithOrganization = await _applicationContext.Employers
            .Where(e => e.UserId == userId)
            .Select(ea => new Employer()
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

    private async Task<Employer> GetUserWithEmployerAccount(int userId,
        Func<IQueryable<User>, IQueryable<User>> includeFunc = null)
    {
        var user = await _entityInclusionHandler.GetUser(userId, includeFunc);
        var account = user.Employer;

        if (account == null) throw new EmployerAccountNotFoundException();

        return account;
    }
}