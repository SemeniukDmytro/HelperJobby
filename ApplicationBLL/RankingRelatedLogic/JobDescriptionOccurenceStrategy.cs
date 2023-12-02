using ApplicationBLL.Interfaces;
using ApplicationDomain.Enums;

namespace ApplicationBLL.RankingRelatedLogic;

public class JobDescriptionOccurenceStrategy : IJobWordOccurrenceStrategy
{
    private const double DescriptionCoefficient = 0.7;
    
    public bool AppliesTo(JobWordOccurrences occurrences)
    {
        return (occurrences & JobWordOccurrences.JobDescription) == JobWordOccurrences.JobDescription;
    }

    public double CalculateScore(double baseScore)
    {
        return baseScore * DescriptionCoefficient;
    }
}