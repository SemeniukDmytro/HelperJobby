namespace ApplicationDomain.Exceptions;

public class RecentSearchNotFoundException : NotFoundExceptionBase
{
    public RecentSearchNotFoundException(
        string message = "There aren't any corresponding results in your recent searches") : base(message)
    {
    }
}