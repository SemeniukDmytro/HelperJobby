using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IOrganizationQueryRepository
{
    public Task<Organization> GetOrganizationById(int organizationId);
    public Task<Organization?> GetOrganizationByName(string organizationName);

}