namespace ApplicationDomain.Exceptions;

public class InvalidSkillException : Exception
{
    public InvalidSkillException(string? message) :
        base(message)
    {
        
    }
}