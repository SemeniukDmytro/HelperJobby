using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class InvalidEmployerAccountException : InvalidModelExceptionBase
{
    public InvalidEmployerAccountException(string? message) : base(message)
    {
        
    }
}