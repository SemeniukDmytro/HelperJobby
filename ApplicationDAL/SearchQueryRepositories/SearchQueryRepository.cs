using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.SearchQueryRepositories;

public class SearchQueryRepository : ISearchQueryRepository
{
    private const int NumberOfResultsPerPage = 10;
    private const int MoreResultsMinimumNumber = 1;

    private readonly ApplicationContext _applicationContext;
    private readonly IFilteringService _filteringService;

    public SearchQueryRepository(ApplicationContext applicationContext, IFilteringService filteringService)
    {
        _applicationContext = applicationContext;
        _filteringService = filteringService;
    }

    public async Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word, string location,
        int numberOfResultsToSkip, bool isRemote,
        decimal payPerHour, decimal payPerDay, decimal payPerWeek, decimal payPerMonth, decimal payPerYear,
        JobTypes jobType,
        string? language)
    {
        var query = _applicationContext.ProcessedJobsWords.Where(p => p.JobIndexedWord.Word == word);

        query = _filteringService.FilterByRemote(query, isRemote);
        query = _filteringService.FilterBySalary(query, payPerHour, payPerDay, payPerWeek, payPerMonth, payPerYear);
        query = _filteringService.FilterByJobType(query, jobType);
        query = _filteringService.FilterByLocation(query, location);
        query = _filteringService.FilterByLanguage(query, language);

        var processedJobWords = await query
            .OrderByDescending(p => p.Rating)
            .Skip(numberOfResultsToSkip)
            .Take(NumberOfResultsPerPage + MoreResultsMinimumNumber)
            .ToListAsync();

        return processedJobWords;
    }

    public async Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(int numberOfResultsToSkip,
        string word)
    {
        var processedJobWords = await _applicationContext.ProcessedResumesWords
            .Where(p => p.ResumeIndexedWord.Word == word)
            .OrderByDescending(p => p.Rating)
            .Skip(numberOfResultsToSkip)
            .Take(NumberOfResultsPerPage + MoreResultsMinimumNumber)
            .ToListAsync();

        return processedJobWords;
    }
}