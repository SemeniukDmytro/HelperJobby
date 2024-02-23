namespace ApplicationDomain.Exceptions;

public class OrganizationNotFoundException : NotFoundExceptionBase
{
    public OrganizationNotFoundException(string message = "Organization with specified id have not been found") :
        base(message)
    {
    }
}