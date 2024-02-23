namespace ApplicationDomain.Exceptions;

public class JobNotFoundException : NotFoundExceptionBase
{
    public JobNotFoundException(string? message = "Job with specified id was not found") : base(message)
    {
    }
}