namespace ApplicationDomain.Exceptions;

public class UserNotFoundException : NotFoundExceptionBase
{
    public UserNotFoundException(string message) : base(message)
    {
        
    }
}