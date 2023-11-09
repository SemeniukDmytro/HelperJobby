using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class EmployerAccountQueryRepository : IEmployerAccountQueryRepository
{
    public Task<EmployerAccount> GetEmployerAccount(int id)
    {
        throw new NotImplementedException();
    }
}