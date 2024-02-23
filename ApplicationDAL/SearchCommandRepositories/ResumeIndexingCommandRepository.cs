using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.SearchICommandRepositories;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.IndexedModels;

namespace ApplicationDAL.SearchCommandRepositories;

public class ResumeIndexingCommandRepository : IResumeIndexingCommandRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly IResumeIndexingQueryRepository _resumeIndexingQueryRepository;

    public ResumeIndexingCommandRepository(ApplicationContext applicationContext,
        IResumeIndexingQueryRepository resumeIndexingQueryRepository)
    {
        _applicationContext = applicationContext;
        _resumeIndexingQueryRepository = resumeIndexingQueryRepository;
    }

    public async Task SaveIndexedResumeWords(List<ResumeIndexedWord> indexedResumeWords)
    {
        _applicationContext.IndexedResumeWords.AddRange(indexedResumeWords);
        await _applicationContext.SaveChangesAsync();
    }


    public async Task SaveProcessedResumeWords(List<ProcessedResumeWord> processedResumeWords)
    {
        _applicationContext.ProcessedResumesWords.AddRange(processedResumeWords);
        await _applicationContext.SaveChangesAsync();
    }

    public async Task UpdateIndexedWordResumeCount(ResumeIndexedWord indexedWord)
    {
        _applicationContext.Entry(indexedWord).Property(i => i.ResumesCount).IsModified = true;
    }

    public async Task RemoveProcessedResumeWordsByResumeId(int resumeId, List<string> words)
    {
        var wordsToDelete = await _resumeIndexingQueryRepository.GetProcessedAndIndexedWordsByResumeId(resumeId, words);
        foreach (var word in wordsToDelete)
        {
            if (--word.ResumesCount <= 0) _applicationContext.Remove(word);
            await UpdateIndexedWordResumeCount(word);
            _applicationContext.Remove(word.ProcessedResumeWords[0]);
        }

        await _applicationContext.SaveChangesAsync();
    }

    public async Task RemoveProcessedResumeWords(int resumeId)
    {
        var wordsToRemove = (await _resumeIndexingQueryRepository.GetProcessedResumeWordsByResumeId(resumeId)).ToList();
        if (wordsToRemove.Count == 0) return;
        foreach (var processedResumeWord in wordsToRemove)
            if (--processedResumeWord.ResumeIndexedWord.ResumesCount <= 0)
                _applicationContext.IndexedResumeWords.Remove(processedResumeWord.ResumeIndexedWord);
            else
                await UpdateIndexedWordResumeCount(processedResumeWord.ResumeIndexedWord);
        _applicationContext.ProcessedResumesWords.RemoveRange(wordsToRemove);
        await _applicationContext.SaveChangesAsync();
    }
}