using HelperJobby.DTOs.Organization;

namespace API_IntegrationTests.Fixtures;

public class EmployeeEmailsFixtures
{
    public static readonly CreateOrganizationEmployeeEmailDTO emailForAdding = new CreateOrganizationEmployeeEmailDTO()
    {
        Email = "test@gmail.com"
    };
}