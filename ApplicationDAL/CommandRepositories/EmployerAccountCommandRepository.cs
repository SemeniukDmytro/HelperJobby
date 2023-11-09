using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class EmployerAccountCommandRepository : IEmployerAccountCommandRepository
{
    public Task<EmployerAccount> Create(EmployerAccount account)
    {
        throw new NotImplementedException();
    }

    public Task<EmployerAccount> Update(int accountId, EmployerAccount updatedInfo)
    {
        throw new NotImplementedException();
    }
}