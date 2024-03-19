using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class OrganizationService : IOrganizationService
{
    private readonly IEmployerQueryRepository _employerQueryRepository;
    private readonly IEmployerService _employerService;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;

    public OrganizationService(IOrganizationQueryRepository organizationQueryRepository,
        IEmployerQueryRepository employerQueryRepository, IEmployerService employerService)
    {
        _organizationQueryRepository = organizationQueryRepository;
        _employerQueryRepository = employerQueryRepository;
        _employerService = employerService;
    }


    public async Task<Organization> UpdateOrganization(int organizationId, Organization updatedOrganization)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var employer = await _employerQueryRepository.GetEmployerByIdWithOrganization(currentEmployerId);
        if (employer.OrganizationId != organizationId || !employer.IsOrganizationOwner)
            throw new ForbiddenException("Only company owner can update organization info");

        if (updatedOrganization.NumberOfEmployees != default)
            employer.Organization.NumberOfEmployees = updatedOrganization.NumberOfEmployees;

        if (!string.IsNullOrEmpty(updatedOrganization.PhoneNumber))
            employer.Organization.PhoneNumber = updatedOrganization.PhoneNumber;
        return employer.Organization;
    }

    public async Task<OrganizationEmployeeEmail> AddEmployeeEmail(int organizationId,
        OrganizationEmployeeEmail employeeEmail)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var employer = await _employerQueryRepository.GetEmployerById(currentEmployerId);
        if (employer.OrganizationId != organizationId || !employer.IsOrganizationOwner)
            throw new ForbiddenException("Only company owner can add new employee emails");

        var potentialEmail =
            await _organizationQueryRepository.GetEmployeeEmailByOrganizationId(organizationId, employeeEmail.Email);
        if (potentialEmail != null) throw new ForbiddenException("This email has already been added");

        employeeEmail.OrganizationId = employer.OrganizationId;
        return employeeEmail;
    }

    public async Task<OrganizationEmployeeEmail> RemoveEmployeeEmail(int employeeEmailId)
    {
        var currentEmployerId = _employerService.GetCurrentEmployerId();
        var currentEmployer = await _employerQueryRepository.GetEmployerById(currentEmployerId);

        var employeeEmail = await _organizationQueryRepository.GetEmployeeEmail(employeeEmailId);

        if (currentEmployer.OrganizationId != employeeEmail.OrganizationId || !currentEmployer.IsOrganizationOwner)
            throw new ForbiddenException("Only organization owner can remove employee email");

        if (currentEmployer.Email == employeeEmail.Email)
            throw new ForbiddenException("You can not remove yourself from your organization");
        return employeeEmail;
    }
}