using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class JobNotFoundException : Exception
{
    public JobNotFoundException(string? message="Job with specified id was not found") : base(message)
    {
        
    }
}