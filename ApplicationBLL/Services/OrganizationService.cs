using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class OrganizationService : IOrganizationService
{
    private readonly IUserService _userService;
    private readonly IUserQueryRepository _userQueryRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;

    public OrganizationService(IUserService userService, IUserQueryRepository userQueryRepository, IOrganizationQueryRepository organizationQueryRepository)
    {
        _userService = userService;
        _userQueryRepository = userQueryRepository;
        _organizationQueryRepository = organizationQueryRepository;
    }
    

    public async Task<Organization> UpdateOrganization(int organizationId, Organization updatedOrganization)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationByIdPlain(organizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        organization.NumberOfEmployees = updatedOrganization.NumberOfEmployees;
        organization.PhoneNumber = updatedOrganization.PhoneNumber;
        return organization;
    }

    public async Task<Organization> AddEmployeeEmail(OrganizationEmployeeEmail employeeEmail)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationById(employeeEmail.OrganizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        organization.EmployeeEmails.Add(employeeEmail);
        return organization;
    }

    public async Task<Organization> RemoveEmployeeEmail(OrganizationEmployeeEmail employeeEmail)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationById(employeeEmail.OrganizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        organization.EmployeeEmails.Remove(employeeEmail);
        return organization;
    }
}