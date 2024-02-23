namespace ApplicationDomain.Exceptions;

public class JobSeekerNotFoundException : NotFoundExceptionBase
{
    public JobSeekerNotFoundException(string message = "Job seeker not found") : base(message)
    {
    }
}