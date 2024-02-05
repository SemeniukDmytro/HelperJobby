using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IEmployerQueryRepository
{
    public Task<Employer> GetEmployer(int userId);
    public Task<Employer> GetEmployerWithOrganization(int userId);
    public Task<Employer> GetEmployerWithIncompleteJob(int userId);
    public Task<Employer> GetEmployerWithOrganizationAndIncompleteJob(int userId);

    public Task<Employer> GetEmployerWithJobs(int userId);
}