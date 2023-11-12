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
        var organization = await _organizationQueryRepository.GetOrganizationPlain(organizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        organization.NumberOfEmployees = updatedOrganization.NumberOfEmployees;
        organization.PhoneNumber = updatedOrganization.PhoneNumber;
        return organization;
    }

    public async Task<OrganizationEmployeeEmail> AddEmployeeEmail(OrganizationEmployeeEmail employeeEmail)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationWithEmployeeEmails(employeeEmail.OrganizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }

        if (organization.EmployeeEmails.Any(e => e.Email == employeeEmail.Email))
        {
            throw new ForbiddenException("This email has already been added");
        }
        return employeeEmail;
    }

    public async Task<OrganizationEmployeeEmail> RemoveEmployeeEmail(OrganizationEmployeeEmail employeeEmail)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationWithEmployeeEmails(employeeEmail.OrganizationId);
        if (organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        bool emailExists = false;

        foreach (var existingEmail in organization.EmployeeEmails)
        {
            if (existingEmail.Email == employeeEmail.Email)
            {
                employeeEmail.Id = existingEmail.Id;
                emailExists = true;
                break;
            }
        }
        if (!emailExists)
        {
            throw new ForbiddenException("There isn't such email in organization employee list");
        }
        return employeeEmail;
    }
}