using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IOrganizationService
{
    public Task<Organization> UpdateOrganization(int organizationId, Organization updatedOrganization);
    public Task<Organization> AddEmployeeEmail(OrganizationEmployeeEmail employeeEmail);
    public Task<Organization> RemoveEmployeeEmail(OrganizationEmployeeEmail employeeEmail);
}