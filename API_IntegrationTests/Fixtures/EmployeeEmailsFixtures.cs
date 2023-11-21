using HelperJobby.DTOs.Organization;

namespace API_IntegrationTests.Fixtures;

public class EmployeeEmailsFixtures
{
    public static readonly OrganizationEmployeeEmailDTO emailForAdding = new OrganizationEmployeeEmailDTO()
    {
        Email = "test@gmail.com"
    };
}