using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class EmployeeEmailException : Exception
{
    public EmployeeEmailException(string message) : base(message)
    {
        
    }
}