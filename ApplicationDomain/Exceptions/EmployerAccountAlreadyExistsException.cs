namespace ApplicationDomain.Exceptions;

public class EmployerAccountAlreadyExistsException : Exception
{
    public EmployerAccountAlreadyExistsException(string message = "Employer account already exists") : base(message)
    {
        
    }
}