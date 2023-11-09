using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IOrganizationCommandRepository
{
    public Task<Organization> CreateOrganization(Organization organization);

    public Task<Organization> UpdateOrganizationById(int id, Organization organization);
}