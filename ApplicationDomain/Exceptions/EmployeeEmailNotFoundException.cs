namespace ApplicationDomain.Exceptions;

public class EmployeeEmailNotFoundException : NotFoundExceptionBase
{
    public EmployeeEmailNotFoundException(string message) : base(message)
    {
    }
}