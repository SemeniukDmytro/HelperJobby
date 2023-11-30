using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IResumeIndexingQueryRepository
{
    public Task<IEnumerable<ResumeIndexedWord>> GetResumeIndexedWords(List<string> words);

    public Task<IEnumerable<ResumeIndexedWord>> GetProcessedAndIndexedWordsByResumeId(int resumeId,
        List<string> words);
}