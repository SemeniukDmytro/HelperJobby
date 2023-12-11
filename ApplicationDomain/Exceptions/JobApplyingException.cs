using System.Linq.Expressions;
using System.Runtime.Serialization;

namespace ApplicationDomain.Exceptions;

public class JobApplyingException : Exception
{
    public JobApplyingException(string message) : base(message)
    {
        
    }
}