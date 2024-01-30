using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class EmployerAccountCommandRepository : IEmployerAccountCommandRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IEmployerAccountQueryRepository _employerAccountQueryRepository;

    public EmployerAccountCommandRepository(ApplicationContext applicationContext,
        IEmployerAccountQueryRepository employerAccountQueryRepository)
    {
        _applicationContext = applicationContext;
        _employerAccountQueryRepository = employerAccountQueryRepository;
    }

    public async Task<EmployerAccount> Create(EmployerAccount account)
    {
        if (account.OrganizationId != 0) _applicationContext.Attach(account.Organization);
        _applicationContext.EmployerAccounts.Add(account);
        await _applicationContext.SaveChangesAsync();
        return account;
    }

    public async Task<EmployerAccount> Update(EmployerAccount updatedInfo)
    {
        _applicationContext.EmployerAccounts.Update(updatedInfo);
        await _applicationContext.SaveChangesAsync();
        return updatedInfo;
    }

    public async Task RemoveEmployeeByEmployeeEmail(OrganizationEmployeeEmail employeeEmail)
    {
        var employee =
            await _applicationContext.EmployerAccounts.FirstOrDefaultAsync(e => e.Email == employeeEmail.Email);
        if (employee != null)
        {
            _applicationContext.EmployerAccounts.Remove(employee);
            await _applicationContext.SaveChangesAsync();
        }
    }
}