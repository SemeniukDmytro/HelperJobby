using System.Net;
using HelperJobby.DTOs.User;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class UserControllerTests : IntegrationTest
{
    public UserControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }
    
    [Fact]
    public async Task GetUserById_ReturnsSuccessfulResponseAndUser()
    {
        // Arrange
        var createdUser = await AuthenticateAsync();
        int userId = createdUser.Id;
        var requestUri = $"/api/User/{userId}";

        // Act
        var getUserResponse = await TestClient.GetAsync(requestUri);
        
        // Assert
        Assert.Equal(HttpStatusCode.OK, getUserResponse.StatusCode);
        var user = getUserResponse.Content.ReadAsAsync<UserDTO>().Result;
        Assert.Equal(userId, user.Id);
    }
    
    [Fact]
    public async Task GetCurrentUser_ReturnsSuccessfulResponseAndUser()
    {
        // Arrange
        var currentUser = await AuthenticateAsync();
        var requestUri = $"/api/User/current-user";

        // Act
        var getUserResponse = await TestClient.GetAsync(requestUri);

        // Assert
        Assert.Equal(HttpStatusCode.OK, getUserResponse.StatusCode);
        var user = getUserResponse.Content.ReadAsAsync<UserDTO>().Result;
        Assert.Equal(currentUser.Id, user.Id);
        Assert.Equal(currentUser.AccountType, user.AccountType);
    }
    
    
    [Fact]
    public async Task UpdateUserShouldReturnUpdatedUser()
    {
        //Arrange
        var currentUser = await AuthenticateAsync();
        var updatedUser = new CreateUpdateUserDTO()
        {
            Email = "",
            Password = "",
            AccountType = "Employer"
        };
        var requestUri = $"api/user/{currentUser.Id}";
        
        //Act
        var updateUserResponse = await TestClient.PutAsJsonAsync(requestUri, updatedUser);
        
        //Assert
        Assert.Equal(HttpStatusCode.OK, updateUserResponse.StatusCode);
        var responseContent = await updateUserResponse.Content.ReadAsAsync<UserDTO>(); 
        Assert.Equal(currentUser.Id, responseContent.Id);
        Assert.Equal(updatedUser.AccountType, responseContent.AccountType);
    }

   
}