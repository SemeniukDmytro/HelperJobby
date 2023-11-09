using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class OrganizationService : IOrganizationService
{
    private readonly IUserService _userService;
    private readonly IUserQueryRepository _queryRepository;

    public OrganizationService(IUserService userService, IUserQueryRepository queryRepository)
    {
        _userService = userService;
        _queryRepository = queryRepository;
    }
    

    public Task<Organization> UpdateOrganization(int organizationId, Organization updatedOrganization)
    {
        throw new NotImplementedException();
    }
}