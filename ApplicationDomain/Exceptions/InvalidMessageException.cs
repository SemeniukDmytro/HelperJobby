namespace ApplicationDomain.Exceptions;

public class InvalidMessageException : InvalidModelExceptionBase
{
    public InvalidMessageException(string message = "Invalid message content provided") : base(message)
    {
    }
}