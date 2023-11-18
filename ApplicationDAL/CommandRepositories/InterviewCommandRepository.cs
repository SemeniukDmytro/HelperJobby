using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class InterviewCommandRepository : IInterviewCommandRepository
{
    public Task<Interview> CreateInterview(Interview interview)
    {
        throw new NotImplementedException();
    }

    public Task DeleteInterview(Interview interview)
    {
        throw new NotImplementedException();
    }
}