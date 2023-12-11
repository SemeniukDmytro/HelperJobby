using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IEmployerAccountQueryRepository
{
    public Task<EmployerAccount> GetEmployerAccount(int userId);
    public Task<EmployerAccount> GetEmployerAccountWithOrganization(int userId);
    public Task<EmployerAccount> GetEmployerAccountWithCurrentJobCreation(int userId);
    public Task<EmployerAccount> GetEmployerAccountOrganizationAndJobCreation(int userId);

    public Task<EmployerAccount> GetEmployerWithJobs(int userId);
}