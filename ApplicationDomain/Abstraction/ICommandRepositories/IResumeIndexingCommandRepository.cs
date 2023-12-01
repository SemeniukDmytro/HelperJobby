using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IResumeIndexingCommandRepository
{
    public Task SaveIndexedResumeWords(List<ResumeIndexedWord> indexedResumeWords);
    public Task SaveProcessedResumeWords(List<ProcessedResumeWord> processedResumeWords);
    public Task UpdateIndexedWordResumeCount(ResumeIndexedWord indexedWord);

    public Task RemoveProcessedResumeWordsByResumeId(int resumeId, List<string> words);
    public Task RemoveProcessedResumeWords(int resumeId);

}