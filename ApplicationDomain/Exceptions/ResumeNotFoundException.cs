using System.Runtime.Serialization;
using ApplicationDomain.Models;

namespace ApplicationDomain.Exceptions;

public class ResumeNotFoundException : Exception
{
    public ResumeNotFoundException(string? message = "Resume with provided Id does not exists") : base(message)
    {
        
    }
}