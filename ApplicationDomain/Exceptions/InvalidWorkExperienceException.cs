namespace ApplicationDomain.Exceptions;

public class InvalidWorkExperienceException : Exception
{
    public InvalidWorkExperienceException(string? message) :
        base(message)
    {
        
    }
}