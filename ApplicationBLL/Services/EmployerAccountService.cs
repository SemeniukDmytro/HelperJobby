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
    public EmployerAccountService(IUserService userService, IEmployerAccountQueryRepository employerAccountQueryRepository)
    {
        _userService = userService;
        _employerAccountQueryRepository = employerAccountQueryRepository;
    }

    public async Task<EmployerAccount> CreateEmployerAccount(EmployerAccount account)
    {
        var currentUserId = _userService.GetCurrentUserId();
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
        if (!string.IsNullOrEmpty(updatedAccount.ContactEmail) && updatedAccount.ContactEmail != account.ContactEmail)
        {
            account.ContactEmail = updatedAccount.ContactEmail;
        }

        if (!string.IsNullOrEmpty(updatedAccount.ContactNumber) &&
            updatedAccount.ContactNumber != account.ContactNumber)
        {
            account.ContactNumber = updatedAccount.ContactNumber;
        }
        return account;
    }
}