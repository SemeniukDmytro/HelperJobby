using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IOrganizationQueryRepository
{
    public Task<Organization> GetOrganizationByIdPlain(int organizationId);
    public Task<Organization> GetOrganizationById(int organizationId);
    public Task<Organization> GetOrganizationWithEmployeesEmails(int organizationId);
    public Task<Organization> GetOrganizationWithEmployees(int organizationId);
    public Task<Organization?> GetOrganizationByName(string organizationName);

}