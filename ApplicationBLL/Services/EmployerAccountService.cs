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

    public async Task<EmployerAccount> UpdateEmployerAccount(int accountId, EmployerAccount updatedAccount)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var account = await _employerAccountQueryRepository.GetEmployerAccount(accountId);
        if (account.UserId != currentUserId)
        {
            throw new ForbiddenException();
        }
        account.ContactEmail = updatedAccount.ContactEmail;
        account.FullName = updatedAccount.FullName;
        return account;
    }
}