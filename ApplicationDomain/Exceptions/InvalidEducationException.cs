namespace ApplicationDomain.Exceptions;

public class InvalidEducationException : InvalidModelExceptionBase
{
    public InvalidEducationException(string? message) :
        base(message)
    {
        
    }
}