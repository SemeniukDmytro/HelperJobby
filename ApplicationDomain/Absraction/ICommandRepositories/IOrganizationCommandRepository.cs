using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IOrganizationCommandRepository
{
    public Task<Organization> UpdateOrganizationById(int id, Organization organization);

    public Task AddOrganizationEmployeesEmails(OrganizationEmployeeEmail organizationEmployeeEmail);
    public Task RemoveOrganizationEmployeesEmails(OrganizationEmployeeEmail organizationEmployeeEmail);
}