namespace API_IntegrationTests;

public class UserControllerTests : IntegrationTest
{
    [Fact]
    public async Task UpdateUserShouldReturnUpdatedUser()
    {
        await RegisterNewUser("integration_tests@gmail.com", "integration_tests", "Job seeker");
    }
}