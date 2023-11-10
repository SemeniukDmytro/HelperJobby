using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
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

    public Task<Organization> GetOrganizationByIdPlain(int organizationId)
    {
        throw new NotImplementedException();
    }

    public Task<Organization> GetOrganizationById(int organizationId)
    {
        throw new NotImplementedException();
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