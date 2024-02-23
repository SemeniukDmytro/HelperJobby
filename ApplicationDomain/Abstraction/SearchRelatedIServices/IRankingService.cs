namespace ApplicationDomain.Abstraction.SearchRelatedIServices;

public interface IRankingService
{
    public Dictionary<string, decimal> CalculateJobWordScores(string[] titleWords, string[] jobFeatures,
        string[] descriptionWords);

    public decimal CalculateResumeWordScore(int wordCount);

    public decimal CombineFrequencyAndRanking(int frequency, decimal totalRank);
}