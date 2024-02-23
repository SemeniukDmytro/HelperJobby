using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IOrganizationQueryRepository
{
    public Task<Organization> GetOrganizationPlain(int organizationId);
    public Task<Organization> GetOrganizationWithEmployeeEmails(int organizationId);
    public Task<OrganizationEmployeeEmail> GetEmployeeEmail(int emailId);
    public Task<OrganizationEmployeeEmail?> GetEmployeeEmailByOrganizationId(int organizationId, string email);
    public Task<Organization> GetOrganizationWithEmployees(int organizationId);
    public Task<Organization?> GetOrganizationByName(string organizationName);
}