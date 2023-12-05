using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IResumeQueryRepository
{
    public Task<Resume> GetResumeById(int resumeId);
    public Task<IEnumerable<Resume>> GetResumesByResumeIds(List<int> resumeIds);
}