namespace ApplicationDomain.Exceptions;

public class WorkExperienceNotFoundException : NotFoundExceptionBase
{
    public WorkExperienceNotFoundException(string? message = "Education with specified id was not found") :
        base(message)
    {
    }
}