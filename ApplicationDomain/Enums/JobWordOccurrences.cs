namespace ApplicationDomain.Enums;

public enum JobWordOccurrences
{
    JobTitle = 1,
    JobFeatures = 1 << 1,
    JobDescription = 1 << 2
}