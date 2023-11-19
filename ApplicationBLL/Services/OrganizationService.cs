using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class OrganizationService : IOrganizationService
{
    private readonly IUserService _userService;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;

    public OrganizationService(IUserService userService,
        IOrganizationQueryRepository organizationQueryRepository)
    {
        _userService = userService;
        _organizationQueryRepository = organizationQueryRepository;
    }
    

    public async Task<Organization> UpdateOrganization(int organizationId, Organization updatedOrganization)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationPlain(organizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        organization.NumberOfEmployees = updatedOrganization.NumberOfEmployees;
        organization.PhoneNumber = updatedOrganization.PhoneNumber;
        return organization;
    }

    public async Task<OrganizationEmployeeEmail> AddEmployeeEmail(int organizationId, OrganizationEmployeeEmail employeeEmail)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationPlain(organizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        
        var potentialEmail =
            await _organizationQueryRepository.GetEmployeeEmailByOrganizationId(organizationId, employeeEmail.Email);
        if (potentialEmail != null)
        {
            throw new ForbiddenException("This email has already been added");
        }

        employeeEmail.OrganizationId = organization.Id;
        return employeeEmail;
    }

    public async Task<OrganizationEmployeeEmail> RemoveEmployeeEmail(int organizationId, OrganizationEmployeeEmail employeeEmail)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationPlain(organizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        var potentialEmail =
            await _organizationQueryRepository.GetEmployeeEmailByOrganizationId(organizationId, employeeEmail.Email);
        if (potentialEmail == null)
        {
            throw new ForbiddenException("There isn't such email in organization employee list");
        }
        return potentialEmail;
    }
}