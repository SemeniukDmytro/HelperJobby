using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class InvalidJobSeekerAccountUpdateException : Exception
{
    public InvalidJobSeekerAccountUpdateException(string? message) : base(message)
    {
        
    }
}