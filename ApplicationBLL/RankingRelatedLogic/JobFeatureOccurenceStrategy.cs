using ApplicationBLL.Interfaces;
using ApplicationDomain.Enums;

namespace ApplicationBLL.RankingRelatedLogic;

public class JobFeatureOccurenceStrategy : IJobWordOccurrenceStrategy
{
    private const double JobFeatureCoefficient = 1.3;
    
    public bool AppliesTo(JobWordOccurrences occurrences)
    {
        return (occurrences & JobWordOccurrences.JobFeatures) == JobWordOccurrences.JobFeatures;
    }

    public double CalculateScore(double baseScore)
    {
        return baseScore * JobFeatureCoefficient;
    }
}