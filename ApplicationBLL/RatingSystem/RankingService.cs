using ApplicationDomain.Abstraction.IServices;

namespace ApplicationBLL.RatingSystem;

public class RankingService : IRankingService
{
    public Dictionary<string, decimal> CalculateJobWordScores(string[] titleWords, string[] jobFeatures, string[] descriptionWords)
    {
        var weightedWords = new Dictionary<string, decimal>();

        ProcessWords(titleWords, RankingConstants.TitleCoefficient, RankingConstants.MainContentWordCountThreshold);
        ProcessWords(jobFeatures, RankingConstants.JobFeatureCoefficient, RankingConstants.FeaturesWordCountThreshold);
        ProcessWords(descriptionWords, RankingConstants.DescriptionCoefficient, RankingConstants.DescriptionWordCountThreshold);

        return weightedWords;

        void ProcessWords(string[] sectionWords, decimal multiplier, int wordCountThreshold)
        {
            var wordCounts = sectionWords.GroupBy(word => word).ToDictionary(group => group.Key, group => group.Count());
            foreach (var wordFrequency in wordCounts)
            {
                decimal ratingMultiplier = ShouldApplyMultiplier(wordFrequency.Value, wordCountThreshold) ? 
                    multiplier : GetBoundedMultiplier(wordFrequency.Value);
            
                if (weightedWords.ContainsKey(wordFrequency.Key))
                {
                    weightedWords[wordFrequency.Key] *= ratingMultiplier;
                }
                else
                {
                    weightedWords.Add(wordFrequency.Key, 1.0m * ratingMultiplier);
                }
            }
        }
    }
    
    private bool ShouldApplyMultiplier(int wordCountInDescription, int wordCountThreshold)
    {
        return wordCountInDescription < wordCountThreshold;
    }

    public decimal CalculateResumeWordScore(int wordCount)
    {
        decimal ratingMultiplier = ShouldApplyMultiplier(wordCount, RankingConstants.MainContentWordCountThreshold) ? 
            RankingConstants.CoefficientForResumeContent : GetBoundedMultiplier(wordCount);
        
        return wordCount * ratingMultiplier;
    }

    public decimal CombineFrequencyAndRanking(int frequency, decimal totalRank)
    {
        return (frequency * RankingConstants.QueryResultFrequencyWeight) * (totalRank * RankingConstants.QueryResultTotalRankWeight);
    }

    private decimal GetBoundedMultiplier(int wordFrequencyValue)
    {
        decimal inverseFrequency = 1.0m / wordFrequencyValue;

        decimal lowerBound = 0.1m;
        decimal upperBound = 0.8m;

        decimal scaledMultiplier = lowerBound + (upperBound - lowerBound) * inverseFrequency;

        decimal boundedMultiplier = Math.Max(lowerBound, Math.Min(upperBound, scaledMultiplier));

        return boundedMultiplier;
    }
    
}