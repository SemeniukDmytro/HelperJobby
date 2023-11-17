using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IEducationCommandRepository
{
    public Task<Education> Create(Education education);
    public Task<Education> Update(Education education);
    public Task Delete(Education education);
}