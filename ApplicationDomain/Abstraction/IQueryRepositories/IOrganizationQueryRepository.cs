using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IOrganizationQueryRepository
{
    public Task<Organization> GetOrganizationPlain(int organizationId);
    public Task<Organization> GetOrganizationWithEmployeeEmails(int organizationId);
    public Task<Organization> GetOrganizationWithEmployees(int organizationId);
    public Task<Organization?> GetOrganizationByName(string organizationName);

}