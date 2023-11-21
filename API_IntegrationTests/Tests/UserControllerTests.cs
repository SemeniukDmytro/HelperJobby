using System.Net;
using FluentAssertions;
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
        var currentUser = await AuthenticateAsync();
        var requestUri = $"/api/User/current-user";

        // Act
        var response = await TestClient.GetAsync(requestUri);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var user = response.Content.ReadAsAsync<UserDTO>().Result;
        Assert.True(response.IsSuccessStatusCode);
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
        var response = await TestClient.PutAsJsonAsync(requestUri, updatedUser);
        //Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var responseContent = await response.Content.ReadAsAsync<UserDTO>(); 
        Assert.Equal(currentUser.Id, responseContent.Id);
        Assert.Equal(updatedUser.AccountType, responseContent.AccountType);
    }

   
}