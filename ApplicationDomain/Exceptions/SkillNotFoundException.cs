namespace ApplicationDomain.Exceptions;

public class SkillNotFoundException : NotFoundExceptionBase
{
    public SkillNotFoundException(string message = "Skill with specified id was not found") : base(message)
    {
    }
}