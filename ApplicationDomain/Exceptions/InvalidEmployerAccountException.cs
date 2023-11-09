using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class InvalidEmployerAccountException : Exception
{
    public InvalidEmployerAccountException(string? message) : base(message)
    {
        
    }
}