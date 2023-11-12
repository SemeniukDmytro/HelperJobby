using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IEmployerAccountQueryRepository
{
    public Task<EmployerAccount> GetEmployerAccount(int userId);
    public Task<EmployerAccount> GetEmployerAccountWithOrganization(int userId);
    public Task<EmployerAccount> GetEmployerAccountWithCurrentJobCreation(int userId);
    public Task<EmployerAccount> GetEmployerAccountOrganizationAndJobCreation(int userId);
}