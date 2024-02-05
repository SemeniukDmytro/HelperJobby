using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IEmployerAccountService
{
    public Task<Employer> CreateEmployer(Employer createdEmployer);
    public Task<Employer> UpdateEmployer(int userId, Employer updatedEmployer);
}