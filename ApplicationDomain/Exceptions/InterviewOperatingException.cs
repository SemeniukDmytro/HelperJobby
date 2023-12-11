using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class InterviewOperatingException : Exception
{
    public InterviewOperatingException(string message) : base(message)
    {
        
    }
}