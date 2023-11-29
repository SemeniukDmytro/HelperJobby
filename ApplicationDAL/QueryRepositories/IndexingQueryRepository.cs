using System.Diagnostics;
using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class IndexingQueryRepository : IIndexingQueryRepository
{
    private readonly SearchEngineContext _searchEngineContext;

    public IndexingQueryRepository(SearchEngineContext searchEngineContext)
    {
        _searchEngineContext = searchEngineContext;
    }

    public async Task<IndexedJobWord> GetIndexedJobWord(string word)
    {
        var indexedWord = await _searchEngineContext.IndexedJobWords.FirstOrDefaultAsync(w => w.Word == word);
        return indexedWord;
    }

    public async Task<IEnumerable<IndexedJobWord>> GetIndexedJobWords(List<string> words)
    {
        var results = await _searchEngineContext.IndexedJobWords.Where(w => words.Contains(w.Word))
            .ToListAsync();
        return results;
    }

    public async Task<IndexedResumeWord> GetIndexedResumeWord(string word)
    {
        var indexedWord = await _searchEngineContext.IndexedResumeWords.FirstOrDefaultAsync(w => w.Word == word);
        return indexedWord;
    }
}