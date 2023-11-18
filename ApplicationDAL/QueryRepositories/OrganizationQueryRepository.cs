using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class OrganizationQueryRepository : IOrganizationQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public OrganizationQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }
    public async Task<Organization> GetOrganizationPlain(int organizationId)
    {
        var organization = await _applicationContext.Organizations.FirstOrDefaultAsync(o => o.Id == organizationId);
        if (organization == null)
        {
            throw new OrganizationNotFoundException();
        }

        return organization;
    }

    public async Task<Organization> GetOrganizationWithEmployeeEmails(int organizationId)
    {
        var organization = await GetOrganizationPlain(organizationId);
        await _applicationContext.Entry(organization).Collection(o => o.EmployeeEmails).LoadAsync();
        return organization;
    }

    public async  Task<Organization> GetOrganizationWithEmployees(int organizationId)
    {
        var organization = await GetOrganizationPlain(organizationId);
        await _applicationContext.Entry(organization).Collection(o => o.EmployeeAccounts).LoadAsync();
        return organization;
    }

    public async Task<Organization?> GetOrganizationByName(string organizationName)
    {
        var organization = await _applicationContext.Organizations.FirstOrDefaultAsync(o => o.Name == organizationName);
        if (organization == null)
        {
            return null;
        }
        await _applicationContext.Entry(organization).Collection(o => o.EmployeeEmails).LoadAsync();
        return organization;
    }
}