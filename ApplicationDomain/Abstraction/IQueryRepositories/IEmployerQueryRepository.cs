using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IEmployerQueryRepository
{
    public Task<Employer> GetEmployer(int userId);
    public Task<Employer> GetEmployerWithOrganization(int userId);
}