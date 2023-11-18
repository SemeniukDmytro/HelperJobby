using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class InvalidInterviewException : Exception
{
    public InvalidInterviewException(string message) : base(message)
    {
        
    }
}