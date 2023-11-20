using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class OrganizationCommandRepository : IOrganizationCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public OrganizationCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Organization> UpdateOrganizationById(Organization organization)
    {
        _applicationContext.Organizations.Update(organization);
        await _applicationContext.SaveChangesAsync();
        return organization;
    }

    public async Task AddOrganizationEmployeesEmails(OrganizationEmployeeEmail organizationEmployeeEmail)
    {
        _applicationContext.OrganizationEmployeeEmails.Add(organizationEmployeeEmail);
        await _applicationContext.SaveChangesAsync();

    }

    public async Task RemoveOrganizationEmployeesEmails(OrganizationEmployeeEmail organizationEmployeeEmail)
    {
        _applicationContext.OrganizationEmployeeEmails.Remove(organizationEmployeeEmail);
        await _applicationContext.SaveChangesAsync();
    }
}