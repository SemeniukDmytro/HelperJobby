namespace ApplicationDomain.Exceptions;

public class InvalidJobSeekerAccountUpdateException : InvalidModelExceptionBase
{
    public InvalidJobSeekerAccountUpdateException(string? message) : base(message)
    {
    }
}