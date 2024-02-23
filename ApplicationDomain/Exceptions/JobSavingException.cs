namespace ApplicationDomain.Exceptions;

public class JobSavingException : Exception
{
    public JobSavingException(string message) : base(message)
    {
    }
}