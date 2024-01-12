using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.SearchQueryRepositories;

public class SearchQueryRepository : ISearchQueryRepository
{
    private const int NumberOfResultsPerPage = 10;
    private const int MoreResultsMinimumNumber = 1;
    
    private readonly ApplicationContext _applicationContext;

    public SearchQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }
    
    public async Task<IEnumerable<ProcessedJobWord>> GetProcessedJobWordsByWord(string word, string location, int numberOfResultsToSkip, bool isRemote,
        decimal payPerHour, decimal payPerDay, decimal payPerWeek, decimal payPerMonth, decimal payPerYear, JobTypes jobType,
        string? language)
    {
        var query = _applicationContext.ProcessedJobsWords.Where(p => p.JobIndexedWord.Word == word);

        if (isRemote)
        {
            query = query.Where(p => p.Job.Location.ToLower().Contains("remote"));
        }

        if (payPerHour > 0)
        {
            query = query.Where(p => 
                (p.Job.Salary >= payPerHour && p.Job.SalaryRate.ToLower() == "per hour")
                 || (p.Job.Salary >= payPerDay && p.Job.SalaryRate.ToLower() == "per day")
                 || (p.Job.Salary >= payPerWeek && p.Job.SalaryRate.ToLower() == "per week")
                 || (p.Job.Salary >= payPerMonth && p.Job.SalaryRate.ToLower() == "per month")
                 || (p.Job.Salary >= payPerYear && p.Job.SalaryRate.ToLower() == "per year"));
        }

        if ((int)jobType != 0)
        {
            query = query.Where(p => (p.Job.JobTypes & jobType) != 0);
        }

        if (!string.IsNullOrEmpty(location))
        {
            query = query.Where(p => p.Job.Location.Contains(location));
        }

        if (!string.IsNullOrEmpty(language))
        {
            query = query.Where(p => p.Job.Language.ToLower() == language.ToLower());
        }
        
        var processedJobWords = await query
            .OrderByDescending(p => p.Rating)
            .Skip(numberOfResultsToSkip)
            .Take(NumberOfResultsPerPage + MoreResultsMinimumNumber)
            .ToListAsync();
        
        return processedJobWords;
    }

    public async Task<IEnumerable<ProcessedResumeWord>> GetProcessedResumeWordsByWord(int numberOfResultsToSkip, string word)
    {
        
        var processedJobWords = await _applicationContext.ProcessedResumesWords
            .Where(p => p.ResumeIndexedWord.Word == word)
            .OrderByDescending(p => p.Rating )
            .Skip(numberOfResultsToSkip)
            .Take(NumberOfResultsPerPage + MoreResultsMinimumNumber)
            .ToListAsync();
        
        return processedJobWords;
    }
}