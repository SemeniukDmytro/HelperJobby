using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IRankingService
{
    public double CalculateRelevanceScore(ProcessedJobWord processedJobWord);
}