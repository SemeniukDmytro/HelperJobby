namespace ApplicationDomain.Exceptions;

public class WorkExperienceNotFoundException : Exception
{
    public WorkExperienceNotFoundException(string? message = "Education with specified id was not found") : base(message)
    {
        
    }
}