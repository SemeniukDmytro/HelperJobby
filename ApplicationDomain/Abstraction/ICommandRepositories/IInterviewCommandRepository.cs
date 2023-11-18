using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IInterviewCommandRepository
{
    public Task<Interview> CreateInterview(Interview interview);
    public Task DeleteInterview(Interview interview);
}