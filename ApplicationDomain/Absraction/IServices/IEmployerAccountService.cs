using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IEmployerAccountService
{
    public Task<EmployerAccount> CreateEmployerAccount(EmployerAccount account);
    public Task<EmployerAccount> UpdateEmployerAccount(int userId, EmployerAccount updatedAccount);
}