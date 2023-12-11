using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class EducationNotFoundException : NotFoundExceptionBase
{
    public EducationNotFoundException(string? message = "Education with specified id was not found") : base(message)
    {
        
    }
}