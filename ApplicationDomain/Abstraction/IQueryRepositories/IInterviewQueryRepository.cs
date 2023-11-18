using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IInterviewQueryRepository
{
    public Task<Interview> GetInterviewByJobIdAndJobSeekerId(int jobId, int jobSeekerId);

}