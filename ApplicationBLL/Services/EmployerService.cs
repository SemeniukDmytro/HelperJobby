using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class EmployerService : IEmployerAccountService
{
    private readonly IEmployerQueryRepository _employerQueryRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;
    private readonly IUserService _userService;

    public EmployerService(IUserService userService,
        IEmployerQueryRepository employerQueryRepository,
        IOrganizationQueryRepository organizationQueryRepository)
    {
        _userService = userService;
        _employerQueryRepository = employerQueryRepository;
        _organizationQueryRepository = organizationQueryRepository;
    }

    public async Task<Employer> CreateEmployer(Employer createdEmployer)
    {
        var currentUserId = _userService.GetCurrentUserId();
        Employer employer = null;
        try
        {
            employer = await _employerQueryRepository.GetEmployer(currentUserId);
        }
        catch (Exception e)
        {
        }

        if (employer != null) throw new ForbiddenException("Employer account has already been created");

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
            createdEmployer.Organization.OrganizationOwnerId = currentUserId;
        }
        else
        {
            createdEmployer.OrganizationId = organization.Id;
            createdEmployer.Organization = organization;
        }

        createdEmployer.UserId = currentUserId;
        return createdEmployer;
    }

    public async Task<Employer> UpdateEmployer(int userId, Employer updatedEmployer)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (userId != currentUserId) throw new ForbiddenException();
        var employer = await _employerQueryRepository.GetEmployer(userId);
        var regexPattern = @"^\+[1-9]{1,3}[0-9]{3,14}$";
        if (employer.UserId != currentUserId) throw new ForbiddenException();
        if (!string.IsNullOrEmpty(updatedEmployer.Email) && updatedEmployer.Email != employer.Email)
            employer.Email = updatedEmployer.Email;

        if (!string.IsNullOrEmpty(updatedEmployer.ContactNumber) &&
            updatedEmployer.ContactNumber != employer.ContactNumber)
            employer.ContactNumber = updatedEmployer.ContactNumber;
        return employer;
    }
}