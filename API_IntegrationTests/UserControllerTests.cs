using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using HelperJobby.DTOs.User;

namespace API_IntegrationTests;

public class UserControllerTests : IntegrationTest
{
    [Fact]
    public async Task GetUserById_ReturnsSuccessfulResponseAndUser()
    {
        // Arrange
        await AuthenticateAsync();
        int userId = 1;
        var requestUri = $"/api/User/{userId}";

        // Act
        var response = await TestClient.GetAsync(requestUri);
        var user = response.Content.ReadAsAsync<UserDTO>().Result;

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.Equal(userId, user.Id);
    }
    
    [Fact]
    public async Task GetCurrentUser_ReturnsSuccessfulResponseAndUser()
    {
        // Arrange
        var currentUser =  await AuthenticateAsync();
        var requestUri = $"/api/User/current-user";

        // Act
        var response = await TestClient.GetAsync(requestUri);
        var user = response.Content.ReadAsAsync<UserDTO>().Result;

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.Equal(currentUser.Id, user.Id);
        Assert.Equal(currentUser.AccountType, user.AccountType);
    }
    
    
    [Fact]
    public async Task UpdateUserShouldReturnUpdatedUser()
    {
        //Arrange
        var user = await AuthenticateAsync();
        var updatedUser = new CreateUpdateUserDTO()
        {
            Email = "",
            Password = "",
            AccountType = "Employer"
        };
        var requestUri = $"api/user/{user.Id}";
        //Act
        var response = await TestClient.PutAsJsonAsync(requestUri, updatedUser);
        //Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var responseContent = await response.Content.ReadAsAsync<UserDTO>(); 
        Assert.Equal(user.Id, responseContent.Id);
        Assert.Equal(updatedUser.AccountType, responseContent.AccountType);
    }
}