using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface IIndexingQueryRepository
{
    public Task<IndexedJobWord> GetIndexedJobWord(string word);

    public Task<IEnumerable<IndexedJobWord>> GetIndexedJobWords(List<string> words);

    public Task<IndexedResumeWord> GetIndexedResumeWord(string word);
}