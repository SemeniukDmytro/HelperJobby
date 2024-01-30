namespace ApplicationDomain.Exceptions;

public class InvalidUserException : InvalidModelExceptionBase
{
    public InvalidUserException(string? message) : base(message)
    {
    }
}