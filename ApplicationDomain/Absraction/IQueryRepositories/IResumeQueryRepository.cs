using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IResumeQueryRepository
{
    public Task<Resume> GetResumeById(int resumeId);
}