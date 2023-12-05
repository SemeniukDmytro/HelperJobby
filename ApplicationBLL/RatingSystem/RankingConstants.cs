namespace ApplicationBLL.RatingSystem;

internal class RankingConstants
{
    internal const int MainContentWordCountThreshold = 3;
    internal const int FeaturesWordCountThreshold = 3;
    internal const int DescriptionWordCountThreshold = 7;

    internal const decimal DescriptionCoefficient = 1.1m;
    internal const decimal JobFeatureCoefficient = 1.3m;
    internal const decimal TitleCoefficient = 1.7m;
    
    internal const decimal CoefficientForResumeContent = 1.7m;
}