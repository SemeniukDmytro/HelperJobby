using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class InvalidResumeException : Exception
{
    public InvalidResumeException(string? message = "Provided information is not enough to create resume") :
        base(message)
    {
        
    }
}