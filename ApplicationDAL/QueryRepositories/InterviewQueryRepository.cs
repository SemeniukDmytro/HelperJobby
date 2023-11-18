using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class InterviewQueryRepository : IInterviewQueryRepository
{
    public Task<Interview> GetInterviewByJobIdAndJobSeekerId(int jobId, int jobSeekerId)
    {
        throw new NotImplementedException();
    }
}