using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IEmployerQueryRepository
{
    public Task<Employer> GetEmployerById(int employerId);
    public Task<Employer> GetEmployerByIdWithOrganization(int employerId);
}