using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class EmployerService : IEmployerService
{
    private readonly IEmployerQueryRepository _employerQueryRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;
    private readonly IUserService _userService;
    private readonly IUserIdGetter _userIdGetter;

    public EmployerService(IUserService userService,
        IEmployerQueryRepository employerQueryRepository,
        IOrganizationQueryRepository organizationQueryRepository, IUserIdGetter userIdGetter)
    {
        _userService = userService;
        _employerQueryRepository = employerQueryRepository;
        _organizationQueryRepository = organizationQueryRepository;
        _userIdGetter = userIdGetter;
    }

    public int GetCurrentEmployerId()
    {
        return _userIdGetter.CurrentEmployerId;
    }

    public async Task<Employer> CreateEmployer(Employer createdEmployer)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var currentEmployerId = 0;
        try
        {
            currentEmployerId = GetCurrentEmployerId();
        }
        catch (Exception e)
        {
        }

        if (currentEmployerId != 0) throw new ForbiddenException("Employer account has already been created");

        var organization = await _organizationQueryRepository.GetOrganizationByName(createdEmployer.Organization.Name);
        
        if (organization != null)
        {
            var employeeEmail =
                await _organizationQueryRepository.GetEmployeeEmailByOrganizationId(organization.Id, createdEmployer.Email);
            if (employeeEmail == null) throw new ForbiddenException("Your email was not found in employees email list");
        }

        if (organization == null)
        {
            createdEmployer.Organization.EmployeeEmails = new List<OrganizationEmployeeEmail>();
            createdEmployer.Organization.EmployeeEmails.Add(new OrganizationEmployeeEmail
            {
                Email = createdEmployer.Email
            });
            createdEmployer.IsOrganizationOwner = true;
        }
        else
        {
            createdEmployer.OrganizationId = organization.Id;
            createdEmployer.Organization = organization;
            createdEmployer.IsOrganizationOwner = false;
        }

        createdEmployer.UserId = currentUserId;
        return createdEmployer;
    }

    public async Task<Employer> UpdateEmployer(int employerId, Employer updatedEmployer)
    {
        var currentEmployerId = GetCurrentEmployerId();
        if (employerId != currentEmployerId) throw new ForbiddenException("You can not update account of another employer");
        var employer = await _employerQueryRepository.GetEmployerById(employerId);
        if (!string.IsNullOrEmpty(updatedEmployer.Email))
            employer.Email = updatedEmployer.Email;

        if (!string.IsNullOrEmpty(updatedEmployer.ContactNumber))
            employer.ContactNumber = updatedEmployer.ContactNumber;
        return employer;
    }
}