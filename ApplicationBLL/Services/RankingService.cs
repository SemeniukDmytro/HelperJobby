using ApplicationBLL.Interfaces;
using ApplicationBLL.RankingRelatedLogic;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;

namespace ApplicationBLL.Services;

public class RankingService : IRankingService
{
    public double CalculateRelevanceScore(ProcessedJobWord processedJobWord)
    {
        var strategies = new List<IJobWordOccurrenceStrategy>
        {
            new JobTitleOccurenceStrategy(),
            new JobFeatureOccurenceStrategy(),
            new JobDescriptionOccurenceStrategy()
        };

        double score = processedJobWord.WordCount;

        foreach (var strategy in strategies)
        {
            if (strategy.AppliesTo(processedJobWord.JobWordOccurrences))
            {
                score = strategy.CalculateScore(score);
            }
        }

        return score;
    }
    
}