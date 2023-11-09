using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class EmployerAccountCommandRepository : IEmployerAccountCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public EmployerAccountCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<EmployerAccount> Create(EmployerAccount account)
    {
        var user = await _applicationContext.Users.AsNoTracking().Include(u => u.EmployerAccount)
            .FirstOrDefaultAsync(u => u.Id == account.UserId);
        if (user.EmployerAccount != null)
        {
            throw new EmployerAccountAlreadyExistsException();
        }

        account.User = user;
        _applicationContext.Attach(account.User);
        _applicationContext.EmployerAccounts.Add(account);
        await _applicationContext.SaveChangesAsync();
        return account;
    }

    public async Task<EmployerAccount> Update(int userId, EmployerAccount updatedInfo)
    {
        var user = await _applicationContext.Users.AsNoTracking().Include(u => u.EmployerAccount)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user.EmployerAccount == null)
        {
            throw new EmployerAccountNotFoundException();
        }
        
        await _applicationContext.SaveChangesAsync();
        return updatedInfo;
    }
}