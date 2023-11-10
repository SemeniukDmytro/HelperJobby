using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
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

    public async Task<Organization> GetOrganizationByIdPlain(int organizationId)
    {
        var organization = await _applicationContext.Organizations.FirstOrDefaultAsync(o => o.Id == organizationId);
        if (organization == null)
        {
            throw new OrganizationNotFoundException();
        }

        return organization;
    }

    public async Task<Organization> GetOrganizationById(int organizationId)
    {
        var organization = await GetOrganizationByIdPlain(organizationId);
        await _applicationContext.Entry(organization).Collection(o => o.EmployeeEmails).LoadAsync();
        await _applicationContext.Entry(organization).Collection(o => o.EmployeeAccounts).LoadAsync();
        return organization;
    }

    public async Task<Organization> GetOrganizationWithEmployeesEmails(int organizationId)
    {
        var organization = await GetOrganizationByIdPlain(organizationId);
        await _applicationContext.Entry(organization).Collection(o => o.EmployeeEmails).LoadAsync();
        _applicationContext.Entry(organization).State = EntityState.Detached;
        return organization;
    }

    public async Task<Organization> GetOrganizationWithEmployees(int organizationId)
    {
        var organization = await GetOrganizationByIdPlain(organizationId);
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