namespace ApplicationDomain.Exceptions;

public class EmployerAccountNotFoundException : NotFoundExceptionBase
{
    public EmployerAccountNotFoundException(string message = "Employer account not found") : base(message)
    {
    }
}