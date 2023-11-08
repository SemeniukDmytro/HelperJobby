namespace ApplicationDomain.Exceptions;

public class EmailIsNotAvailable : Exception
{
    public EmailIsNotAvailable(string message = "User with provided email already exists") : base(message)
    {
        
    }
}