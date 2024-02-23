namespace ApplicationDomain.Exceptions;

public class InvalidEmployerAccountException : InvalidModelExceptionBase
{
    public InvalidEmployerAccountException(string? message) : base(message)
    {
    }
}