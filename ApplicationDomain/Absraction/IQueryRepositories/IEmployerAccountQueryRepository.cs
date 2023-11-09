using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IEmployerAccountQueryRepository
{
    public Task<EmployerAccount> GetEmployerAccount(int id);
}