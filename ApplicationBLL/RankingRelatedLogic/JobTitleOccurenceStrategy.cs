using ApplicationBLL.Interfaces;
using ApplicationDomain.Enums;

namespace ApplicationBLL.RankingRelatedLogic;

public class JobTitleOccurenceStrategy : IJobWordOccurrenceStrategy
{
    
    private const double TitleCoefficient = 1.7;
    
    public bool AppliesTo(JobWordOccurrences occurrences)
    {
        return (occurrences & JobWordOccurrences.JobTitle) == JobWordOccurrences.JobTitle;
    }

    public double CalculateScore(double baseScore)
    {
        return baseScore * TitleCoefficient;
    }
}