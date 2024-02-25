namespace ApplicationDomain.Exceptions;

public class MessageNotFoundException : NotFoundExceptionBase
{
    public MessageNotFoundException(string message = "Message was not found") : base(message)
    {
    }
}