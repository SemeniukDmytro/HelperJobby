using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IEmployerAccountCommandRepository
{
    public Task<EmployerAccount> Create(EmployerAccount account);
    public Task<EmployerAccount> Update(EmployerAccount updatedInfo);
}