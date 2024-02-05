using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface IFilteringService
{
    public IQueryable<ProcessedJobWord> FilterByRemote(IQueryable<ProcessedJobWord> query, bool isRemote);

    public IQueryable<ProcessedJobWord> FilterBySalary(IQueryable<ProcessedJobWord> query,
        decimal payPerHour, decimal payPerDay, decimal payPerWeek, decimal payPerMonth, decimal payPerYear);

    public IQueryable<ProcessedJobWord> FilterByJobType(IQueryable<ProcessedJobWord> query, JobTypes? jobType);

    public IQueryable<ProcessedJobWord> FilterByLocation(IQueryable<ProcessedJobWord> query, string location);

    public IQueryable<ProcessedJobWord> FilterByLanguage(IQueryable<ProcessedJobWord> query, string? language);
}