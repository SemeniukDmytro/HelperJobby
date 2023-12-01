using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class ResumeIndexingQueryRepository : IResumeIndexingQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public ResumeIndexingQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<IEnumerable<ResumeIndexedWord>> GetResumeIndexedWords(List<string> words)
    {
        return await _applicationContext.IndexedResumeWords
            .Where(w => words.Contains(w.Word))
            .ToListAsync();
    }
    
    public async Task<IEnumerable<ResumeIndexedWord>> GetProcessedAndIndexedWordsByResumeId(int resumeId, List<string> words)
    {
        var resumeIndexedWords = await _applicationContext.IndexedResumeWords
            .Include(w => w.ProcessedResumeWords)
            .Where(w => words.Contains(w.Word) && w.ProcessedResumeWords.Any(pw => pw.ResumeId == resumeId))
            .Select(w => new ResumeIndexedWord()
            {
                Id = w.Id,
                Word = w.Word,
                ResumesCount = w.ResumesCount,
                ProcessedResumeWords = w.ProcessedResumeWords.Where(pw => pw.ResumeId == resumeId).ToList()
            })
            .ToListAsync();
        return resumeIndexedWords;
    }
    
    public async Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByResumeId(int resumeId)
    {
        var receivedWords = await _applicationContext.ProcessedResumesWords.Include(w => w.ResumeIndexedWord)
            .Where(w => w.ResumeId == resumeId).ToListAsync();
        return receivedWords;
    }
}