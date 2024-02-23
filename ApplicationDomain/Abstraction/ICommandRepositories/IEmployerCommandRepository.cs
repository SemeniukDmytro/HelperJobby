using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IEmployerCommandRepository
{
    public Task<Employer> CreateEmployer(Employer account);
    public Task<Employer> UpdateEmployer(Employer updatedInfo);
    public Task RemoveEmployeeByEmployeeEmail(OrganizationEmployeeEmail employeeEmail);
}