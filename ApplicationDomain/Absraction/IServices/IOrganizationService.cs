using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IOrganizationService
{
    public Task<Organization> UpdateOrganization(int organizationId, Organization updatedOrganization);
    public Task<OrganizationEmployeeEmail> AddEmployeeEmail(OrganizationEmployeeEmail employeeEmail);
    public Task<OrganizationEmployeeEmail> RemoveEmployeeEmail(OrganizationEmployeeEmail employeeEmail);
}