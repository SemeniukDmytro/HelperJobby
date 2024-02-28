namespace ApplicationDomain.Exceptions;

public class ConversationNotFoundException : NotFoundExceptionBase
{
    public ConversationNotFoundException(string message = "Conversation not found") : base(message)
    {
    }
}