using API_IntegrationTests.TestHelpers;
using HelperJobby.DTOs.User;

namespace API_IntegrationTests.Fixtures;

public class NewUsersFixtures
{
    public static readonly CreateUpdateUserDTO newUser = new CreateUpdateUserDTO()
    {
        Email = RandomStringGenerator.GenerateRandomEmail(),
        Password = "randomPwd",
        AccountType = "Employer"
    };
}