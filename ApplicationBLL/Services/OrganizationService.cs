using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class OrganizationService : IOrganizationService
{
    private readonly IUserService _userService;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;

    public OrganizationService(IUserService userService,
        IOrganizationQueryRepository organizationQueryRepository, IEmployerAccountQueryRepository employerAccountQueryRepository)
    {
        _userService = userService;
        _organizationQueryRepository = organizationQueryRepository;
        _employerAccountQueryRepository = employerAccountQueryRepository;
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

    public async Task<OrganizationEmployeeEmail> RemoveEmployeeEmail(int employeeEmailId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var employeeEmail = await _organizationQueryRepository.GetEmployeeEmail(employeeEmailId);
        if (employeeEmail.Organization.OrganizationOwnerId != currentUserId)
        {
            throw new ForbiddenException();
        }
        var currentEmployer = await _employerAccountQueryRepository.GetEmployerAccount(currentUserId);
        if (currentEmployer.Email == employeeEmail.Email)
        {
            throw new ForbiddenException("You can not remove yourself from your organization");
        }
        return employeeEmail;
    }
}