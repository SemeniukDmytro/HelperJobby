namespace ApplicationDomain.Exceptions;

public class NotFoundExceptionBase : Exception
{
    protected NotFoundExceptionBase(string message) : base(message)
    {
        EntityName = GetType().Name.Replace("NotFoundException", "");
    }

    public string EntityName { get; private set; }
}