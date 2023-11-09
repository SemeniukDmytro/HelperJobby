using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class OrganizationCommandRepository : IOrganizationCommandRepository
{
    public Task<Organization> CreateOrganization(Organization organization)
    {
        throw new NotImplementedException();
    }

    public Task<Organization> UpdateOrganizationById(int id, Organization organization)
    {
        throw new NotImplementedException();
    }
}