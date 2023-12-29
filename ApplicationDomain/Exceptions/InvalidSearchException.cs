namespace ApplicationDomain.Exceptions;

public class InvalidSearchException : InvalidModelExceptionBase
{
    public InvalidSearchException(string message = "Invalid search parameters have been provided") : base(message)
    {
    }
}