using API_IntegrationTests.TestHelpers;
using HelperJobby.DTOs.Account;

namespace API_IntegrationTests.Fixtures;

public class NewEmployerFixtures
{
    public static readonly CreateEmployerAccountDTO EmployerWithRandomOrganization = new()
    {
        FullName = "test name",
        Email = RandomStringGenerator.GenerateRandomEmail(),
        OrganizationName = RandomStringGenerator.GenerateRandomString(15),
        ContactNumber = RandomStringGenerator.GeneratePhoneNumber(),
        NumberOfEmployees = 10
    };

    public static CreateEmployerAccountDTO EmployerCreationInCreatedOrganization = new()
    {
        FullName = "test name",
        Email = "test@gmail.com",
        OrganizationName = "TestOrganization",
        ContactNumber = "+123456789",
        NumberOfEmployees = 10
    };
}