namespace ApplicationDomain.Exceptions;

public class InvalidModelExceptionBase : Exception
{
    public string EntityName { get; private set; }

    protected InvalidModelExceptionBase(string message) : base(message)
    {
        EntityName = this.GetType().Name.Replace("Invalid", "").Replace("Exception", "");
    }
}