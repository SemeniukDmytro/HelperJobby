using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IEmployerAccountService
{
    public Task<EmployerAccount> CreateEmployerAccount(EmployerAccount account);
    public Task<EmployerAccount> UpdateEmployerAccount(int userId, EmployerAccount updatedAccount);
}