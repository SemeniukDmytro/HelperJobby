using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchIQueryRepositories;

public interface IResumeIndexingQueryRepository
{
    public Task<IEnumerable<ResumeIndexedWord>> GetResumeIndexedWords(List<string> words);

    public Task<IEnumerable<ResumeIndexedWord>> GetProcessedAndIndexedWordsByResumeId(int resumeId,
        List<string> words);

    public Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByResumeId(int resumeId);

}