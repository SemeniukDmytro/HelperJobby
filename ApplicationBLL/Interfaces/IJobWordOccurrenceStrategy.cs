using ApplicationDomain.Enums;

namespace ApplicationBLL.Interfaces;

public interface IJobWordOccurrenceStrategy
{
    bool AppliesTo(JobWordOccurrences occurrences);
    double CalculateScore(double baseScore);
}