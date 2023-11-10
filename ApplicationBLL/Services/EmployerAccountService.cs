using System.Text.RegularExpressions;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class EmployerAccountService : IEmployerAccountService
{
    private readonly IUserService _userService;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;
    private readonly IOrganizationQueryRepository _organizationQueryRepository;
    public EmployerAccountService(IUserService userService, IEmployerAccountQueryRepository employerAccountQueryRepository, IOrganizationQueryRepository organizationQueryRepository)
    {
        _userService = userService;
        _employerAccountQueryRepository = employerAccountQueryRepository;
        _organizationQueryRepository = organizationQueryRepository;
    }

    public async Task<EmployerAccount> CreateEmployerAccount(EmployerAccount account)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var organization = await _organizationQueryRepository.GetOrganizationByName(account.Organization.Name);
        if (organization != null && !organization.EmployeeEmails.Select(ee => ee.Email).Contains(account.Email))
        {
            throw new ForbiddenException();
        }
        if (organization == null)
        {
            account.Organization.EmployeeEmails = new List<OrganizationEmployeeEmail>();
            account.Organization.EmployeeEmails.Add(new OrganizationEmployeeEmail()
            {
                Email = account.Email
            });
            account.Organization.OrganizationOwnerId = currentUserId;
        }
        else
        {
            account.OrganizationId = organization.Id;
            account.Organization = organization;
        }
        account.UserId = currentUserId;
        return account;
    }

    public async Task<EmployerAccount> UpdateEmployerAccount(int userId, EmployerAccount updatedAccount)
    {
        var currentUserId = _userService.GetCurrentUserId();
        if (userId != currentUserId)
        {
            throw new ForbiddenException();
        }
        var account = await _employerAccountQueryRepository.GetEmployerAccount(userId);
        string regexPattern = @"^\+[1-9]{1,3}[0-9]{3,14}$";
        if (account.UserId != currentUserId)
        {
            throw new ForbiddenException();
        }
        if (!string.IsNullOrEmpty(updatedAccount.Email) && updatedAccount.Email != account.Email)
        {
            account.Email = updatedAccount.Email;
        }

        if (!string.IsNullOrEmpty(updatedAccount.ContactNumber) &&
            updatedAccount.ContactNumber != account.ContactNumber)
        {
            account.ContactNumber = updatedAccount.ContactNumber;
        }
        return account;
    }
}