using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class InterviewCommandRepository : IInterviewCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public InterviewCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Interview> CreateInterview(Interview interview)
    {  
        _applicationContext.Interviews.Add(interview);
        await _applicationContext.SaveChangesAsync();
        return interview;
    }

    public async Task DeleteInterview(Interview interview)
    {
        _applicationContext.Interviews.Remove(interview);
        await _applicationContext.SaveChangesAsync();
    }
}