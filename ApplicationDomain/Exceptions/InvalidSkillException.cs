namespace ApplicationDomain.Exceptions;

public class InvalidSkillException : InvalidModelExceptionBase
{
    public InvalidSkillException(string? message) :
        base(message)
    {
    }
}