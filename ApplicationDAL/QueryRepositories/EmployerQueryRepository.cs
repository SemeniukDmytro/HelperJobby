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
            .Select(e => new Employer()
            {
                Id = e.Id,
                Email = e.Email,
                FullName = e.FullName,
                ContactNumber = e.ContactNumber,
                UserId = e.UserId,
                HasPostedFirstJob = e.HasPostedFirstJob,
                OrganizationId = e.OrganizationId,
                Organization = e.Organization
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
        var employer = user.Employer;

        if (employer == null) throw new EmployerAccountNotFoundException();

        return employer;
    }
}