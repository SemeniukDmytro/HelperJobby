using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;

namespace ApplicationBLL.SearchRelatedServices;

public class FilteringService : IFilteringService
{
    public IQueryable<ProcessedJobWord> FilterByRemote(IQueryable<ProcessedJobWord> query, bool isRemote)
    {
        return isRemote ? query.Where(p => p.Job.Location.ToLower().Contains("remote")) : query;
    }

    public IQueryable<ProcessedJobWord> FilterBySalary(IQueryable<ProcessedJobWord> query,
        decimal payPerHour, decimal payPerDay, decimal payPerWeek, decimal payPerMonth, decimal payPerYear)
    {
        if (payPerHour < 0)
        {
            return query;
        }
        query = query.Where(p => p.Job.Salary != null && (
            (p.Job.Salary.SalaryRate == SalaryRates.PerHour && 
             ((p.Job.Salary.MaximalAmount != null && p.Job.Salary.MaximalAmount >= payPerHour) || p.Job.Salary.MinimalAmount >= payPerHour)) ||
            (p.Job.Salary.SalaryRate == SalaryRates.PerDay && 
             ((p.Job.Salary.MaximalAmount != null && p.Job.Salary.MaximalAmount >= payPerDay) || p.Job.Salary.MinimalAmount >= payPerDay)) ||
            (p.Job.Salary.SalaryRate == SalaryRates.PerWeek && 
             ((p.Job.Salary.MaximalAmount != null && p.Job.Salary.MaximalAmount >= payPerWeek) || p.Job.Salary.MinimalAmount >= payPerWeek)) ||
            (p.Job.Salary.SalaryRate == SalaryRates.PerMonth && 
             ((p.Job.Salary.MaximalAmount != null && p.Job.Salary.MaximalAmount >= payPerMonth) || p.Job.Salary.MinimalAmount >= payPerMonth)) ||
            (p.Job.Salary.SalaryRate == SalaryRates.PerYear && 
             ((p.Job.Salary.MaximalAmount != null && p.Job.Salary.MaximalAmount >= payPerYear) || p.Job.Salary.MinimalAmount >= payPerYear))
        ));
        return query;
    }

    public IQueryable<ProcessedJobWord> FilterByJobType(IQueryable<ProcessedJobWord> query, JobTypes? jobType)
    {
        return jobType != null && (int)jobType != 0 ? query.Where(p => (p.Job.JobTypes & jobType) != 0) : query;
    }

    public IQueryable<ProcessedJobWord> FilterByLocation(IQueryable<ProcessedJobWord> query, string location)
    {
        return !string.IsNullOrEmpty(location) ? query.Where(p => p.Job.Location.ToLower().Contains(location.ToLower()) 
                                                                  || p.Job.LocationCountry.ToLower().Contains(location.ToLower())) : query;
    }

    public IQueryable<ProcessedJobWord> FilterByLanguage(IQueryable<ProcessedJobWord> query, string language)
    {
        return !string.IsNullOrEmpty(language) ? query.Where(p => p.Job.Language.ToLower() == language.ToLower()) : query;
    }
}