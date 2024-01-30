namespace ApplicationDomain.Exceptions;

public class InvalidJobException : InvalidModelExceptionBase
{
    public InvalidJobException(string? message = "Please provide job with all necessary values") : base(message)
    {
    }
}