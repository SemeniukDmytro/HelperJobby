using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class JobNotValidException : Exception
{
    public JobNotValidException(string? message = "Please provide job with all necessary values") : base(message)
    {
        
    }
}