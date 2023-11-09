using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IEmployerAccountCommandRepository
{
    public Task<EmployerAccount> Create(EmployerAccount account);
    public Task<EmployerAccount> Update(int accountId, EmployerAccount updatedInfo);
}