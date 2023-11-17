namespace ApplicationDomain.Exceptions;

public class InvalidEducationException : Exception
{
    public InvalidEducationException(string? message) :
        base(message)
    {
        
    }
}