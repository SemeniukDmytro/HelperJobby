namespace ApplicationDomain.Exceptions;

public class InvalidResumeException : InvalidModelExceptionBase
{
    public InvalidResumeException(string? message = "Provided information is not enough to create resume") :
        base(message)
    {
    }
}