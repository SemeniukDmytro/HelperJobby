namespace ApplicationDomain.Exceptions;

public class InvalidModelExceptionBase : Exception
{
    protected InvalidModelExceptionBase(string message) : base(message)
    {
        EntityName = GetType().Name.Replace("Invalid", "").Replace("Exception", "");
    }

    public string EntityName { get; private set; }
}