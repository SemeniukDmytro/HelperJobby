using System.Net;
using System.Net.Http.Json;
using API_IntegrationTests.Fixtures;
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
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var user = response.Content.ReadAsAsync<UserDTO>().Result;
        Assert.True(response.IsSuccessStatusCode);
        Assert.Equal(userId, user.Id);
    }
    
    [Fact]
    public async Task GetCurrentUser_ReturnsSuccessfulResponseAndUser()
    {
        // Arrange
        var newUser = NewUsersFixtures.newUser;
        await RegisterNewUser(newUser);
        var currentUser = await LoginUser(newUser.Email, newUser.Password);
        var requestUri = $"/api/User/current-user";

        // Act
        var response = await TestClient.GetAsync(requestUri);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var user = response.Content.ReadAsAsync<UserDTO>().Result;
        Assert.True(response.IsSuccessStatusCode);
        Assert.Equal(currentUser.User.Id, user.Id);
        Assert.Equal(currentUser.User.AccountType, user.AccountType);
    }
    
    
    [Fact]
    public async Task UpdateUserShouldReturnUpdatedUser()
    {
        //Arrange
        var newUser = NewUsersFixtures.newUser;
        await RegisterNewUser(newUser);
        var currentUser = await LoginUser(newUser.Email, newUser.Password);
        var updatedUser = new CreateUpdateUserDTO()
        {
            Email = "",
            Password = "",
            AccountType = "Employer"
        };
        var requestUri = $"api/user/{currentUser.User.Id}";
        //Act
        var response = await TestClient.PutAsJsonAsync(requestUri, updatedUser);
        //Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var responseContent = await response.Content.ReadAsAsync<UserDTO>(); 
        Assert.Equal(currentUser.User.Id, responseContent.Id);
        Assert.Equal(updatedUser.AccountType, responseContent.AccountType);
    }
}