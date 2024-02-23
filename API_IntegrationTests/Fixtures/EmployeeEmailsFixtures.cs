using HelperJobby.DTOs.Organization;

namespace API_IntegrationTests.Fixtures;

public class EmployeeEmailsFixtures
{
    public static readonly CreateOrganizationEmployeeEmailDTO emailForAdding = new()
    {
        Email = "test@gmail.com"
    };
}