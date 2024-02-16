using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IEmployerService
{
    public int GetCurrentEmployerId();
    public Task<Employer> CreateEmployer(Employer createdEmployer);
    public Task<Employer> UpdateEmployer(int employerId, Employer updatedEmployer);
}