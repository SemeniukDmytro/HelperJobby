using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class EmployerAccountQueryRepository : IEmployerAccountQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IUserQueryRepository _userQueryRepository;

    public EmployerAccountQueryRepository(ApplicationContext applicationContext, IUserQueryRepository userQueryRepository)
    {
        _applicationContext = applicationContext;
        _userQueryRepository = userQueryRepository;
    }

    public async Task<EmployerAccount> GetEmployerAccount(int userId)
    {
        var user = await _userQueryRepository.GetUser(userId, q => q.Include(u => u.EmployerAccount));
        var account = user.EmployerAccount;
        if (account == null)
        {
            throw new EmployerAccountNotFoundException();
        }

        return account;
    }
}