namespace ApplicationDomain.Exceptions;

public class InvalidWorkExperienceException : InvalidModelExceptionBase
{
    public InvalidWorkExperienceException(string? message) :
        base(message)
    {
    }
}