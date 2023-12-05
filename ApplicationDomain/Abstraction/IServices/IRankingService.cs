using ApplicationDomain.IndexedModels;

namespace ApplicationDomain.Abstraction.IServices;

public interface IRankingService
{
    public Dictionary<string, decimal> CalculateJobWordScores(string[] titleWords, string[] jobFeatures,
        string[] descriptionWords);
    public decimal CalculateResumeWordScore(int wordCount);
}