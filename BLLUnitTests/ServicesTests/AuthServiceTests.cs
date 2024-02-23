using System.IdentityModel.Tokens.Jwt;
using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit.Abstractions;

namespace BLLUnitTests.ServicesTests;

public class AuthServiceTests
{
    private readonly IAuthService _authService;
    private readonly Mock<IConfiguration> _configurationMock = new();
    private ITestOutputHelper _outputHelper;
    private readonly Mock<IPasswordHandler> _passwordHandlerMock = new();
    private readonly Mock<IUserQueryRepository> _userQueryRepostitoryMock = new();

    public AuthServiceTests(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        _authService = new AuthService(_configurationMock.Object, _userQueryRepostitoryMock.Object,
            _passwordHandlerMock.Object);
    }

    [Fact]
    public void CreateAccessTokenShouldContainValidClaims()
    {
        //Arrange
        var id = 1;
        var email = "test@gmail.com";
        var jobSeekerId = 1;
        var employerId = 1;

        _configurationMock.Setup(c => c["JwtKey"])
            .Returns("Super secret key that will be stored somewhere secretly, so you will never know its real value");
        //Act
        var token = _authService.CreateAuthToken(id, email, jobSeekerId, employerId);
        var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
        //Assert
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value, id.ToString());
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value, email);
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "jobSeekerId")?.Value, jobSeekerId.ToString());
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value, employerId.ToString());

    }


    [Fact]
    public void AuthUserShouldThrowUserNotFoundExceptionOnNotRegisteredEmailProvided()
    {
        _userQueryRepostitoryMock.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ThrowsAsync(
            new UserNotFoundException("User with specified email doesn't exist"));

        //Assert
        Assert.ThrowsAsync<UserNotFoundException>(async () => await _authService.AuthUser(new User
        {
            Email = "random@gmail.com",
            PasswordHash = "testPassword"
        }));
    }

    [Fact]
    public void AuthUserShouldThrowInvalidPasswordExceptionOnInvalidPassword()
    {
        //Arrange
        var user = new User
        {
            Email = "correct@gmail.com",
            PasswordHash = "Wrong"
        };

        _userQueryRepostitoryMock.Setup(c => c.GetUserByEmail(It.IsAny<string>())).ReturnsAsync(
            new User
            {
                Email = "correct@gmail.com",
                PasswordHash = "Correct"
            });

        //Act & assert
        Assert.ThrowsAsync<UserNotFoundException>(async () => await _authService.AuthUser(user));
    }

    [Fact]
    public void AuthUserShouldAuthTokenOnValidData()
    {
        //Arrange
        var loginUser = new User
        {
            Id = 1,
            Email = "correct@gmail.com",
            PasswordHash = "correctPassword",
            Employer = EmployerFixtures.EmployerEntity,
            JobSeeker = JobSeekerFixture.JobSeekerEntity
        };

        _userQueryRepostitoryMock.Setup(c => c.GetUserByEmailWithRefreshToken(It.IsAny<string>())).ReturnsAsync(
            new User
            {
                Email = "correct@gmail.com",
                PasswordHash = "correctPassword"
            });
        _configurationMock.Setup(c => c["JwtKey"])
            .Returns("Super secret key that will be stored somewhere secretly, so you will never know its real value");
        _passwordHandlerMock.Setup(h => h.Verify(loginUser.PasswordHash, "correctPassword")).Returns(true);
        _userQueryRepostitoryMock.Setup(uq => uq.GetUserByEmailWithRefreshToken("correct@gmail.com"))
            .ReturnsAsync(loginUser);
        //Act
        var result = _authService.AuthUser(loginUser).Result;
        //Assert
        Assert.NotEmpty(result.authToken);
        var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(result.authToken);
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value, loginUser.Email);
    }
}