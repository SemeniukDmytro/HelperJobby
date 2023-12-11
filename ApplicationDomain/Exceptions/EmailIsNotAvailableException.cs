namespace ApplicationDomain.Exceptions;

public class EmailIsNotAvailableException : Exception
{
    public EmailIsNotAvailableException(string message = "User with provided email already exists") : base(message)
    {
        
    }
}