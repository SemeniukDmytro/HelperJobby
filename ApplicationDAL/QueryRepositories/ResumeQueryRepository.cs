using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class ResumeQueryRepository : IResumeQueryRepository
{
    public Task<Resume> GetResumeById(int resumeId)
    {
        throw new NotImplementedException();
    }
}