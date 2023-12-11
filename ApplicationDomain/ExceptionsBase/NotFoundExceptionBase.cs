namespace ApplicationDomain.Exceptions;

public class NotFoundExceptionBase : Exception
{
    public string EntityName { get; private set; }

    protected NotFoundExceptionBase(string message) : base(message)
    {
        EntityName = this.GetType().Name.Replace("NotFoundException", "");
    }
}