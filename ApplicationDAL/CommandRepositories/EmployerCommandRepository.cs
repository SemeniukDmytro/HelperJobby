using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.CommandRepositories;

public class EmployerCommandRepository : IEmployerCommandRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IEmployerQueryRepository _employerQueryRepository;

    public EmployerCommandRepository(ApplicationContext applicationContext,
        IEmployerQueryRepository employerQueryRepository)
    {
        _applicationContext = applicationContext;
        _employerQueryRepository = employerQueryRepository;
    }

    public async Task<Employer> CreateEmployer(Employer account)
    {
        if (account.OrganizationId != 0) _applicationContext.Attach(account.Organization);
        _applicationContext.Employers.Add(account);
        await _applicationContext.SaveChangesAsync();
        return account;
    }

    public async Task<Employer> UpdateEmployer(Employer updatedInfo)
    {
        _applicationContext.Employers.Update(updatedInfo);
        await _applicationContext.SaveChangesAsync();
        return updatedInfo;
    }

    public async Task RemoveEmployeeByEmployeeEmail(OrganizationEmployeeEmail employeeEmail)
    {
        var employee =
            await _applicationContext.Employers.FirstOrDefaultAsync(e => e.Email == employeeEmail.Email);
        if (employee != null)
        {
            _applicationContext.Employers.Remove(employee);
            await _applicationContext.SaveChangesAsync();
        }
    }
}