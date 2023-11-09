using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class OrganizationQueryRepository : IOrganizationQueryRepository
{
    public Task<Organization> GetOrganizationById(int organizationId)
    {
        throw new NotImplementedException();
    }

    public Task<Organization?> GetOrganizationByName(string organizationName)
    {
        throw new NotImplementedException();
    }
}