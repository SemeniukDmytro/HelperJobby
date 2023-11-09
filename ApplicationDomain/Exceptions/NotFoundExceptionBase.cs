namespace ApplicationDomain.Exceptions;

public class NotFoundExceptionBase : Exception
{
    public string EntityName { get; private set; }

    public NotFoundExceptionBase(string message) : base(message)
    {
        EntityName = this.GetType().Name.Replace("NotFoundException", "");
    }
}