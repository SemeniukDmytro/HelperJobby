using System.IdentityModel.Tokens.Jwt;
using ApplicationBLL.Services.AuthService;
using ApplicationDAL.Context;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.EntityFrameworkCore;
using Xunit.Abstractions;

namespace ApplicationBLLUnitTests;

public class AuthServiceTests
{
    private IAuthService _authService;
    private Mock<ApplicationContext> _applicationContextMock = new();
    private Mock<IMapper> _mapperMock = new();
    private Mock<IValidator<LoginUserDTO>> _validatorMock = new();
    private Mock<IConfiguration> _configurationMock = new();
    private ITestOutputHelper _outputHelper;
    
    public AuthServiceTests(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        _authService = new AuthService(_mapperMock.Object, _applicationContextMock.Object, _configurationMock.Object,
            _validatorMock.Object);
    }

    [Fact]
    public void CreateAccessTokenShouldContainValidClaims()
    {
        //Arrange
        int id = 1;
        string email = "test@gmail.com";

        _configurationMock.Setup(c => c["JwtKey"])
            .Returns("Super secret key that will be stored somewhere secretly, so you will never know its real value");
        //Act
        string token = _authService.CreateToken(id, email);
        var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
        //Assert
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value, id.ToString());
        Assert.Equal(jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value, email);
    }

    [Fact]
    public void AuthUserShouldThrowAValidationExceptionOnInvalidEmail()
    {
        //Arrange
        LoginUserDTO testUser = new LoginUserDTO()
        {
            Email = "1@gmail.com",
            Password = "validPassword"
        };
        _validatorMock.Setup(v => v.ValidateAsync(It.IsAny<LoginUserDTO>(), CancellationToken.None)).ReturnsAsync(
        
            new ValidationResult()
            {
                Errors = new List<ValidationFailure>{ new("email", "invalid email")}
            }
        );

        //Act && Assert
        
        var ex = Assert.ThrowsAsync<ValidationException>( async () => await _authService.AuthUser(testUser)).Result;
        _outputHelper.WriteLine("" + ex);
    }
    
    [Fact]
    public void AuthUserShouldThrowAValidationExceptionOnInvalidPassword()
    {
        //Arrange
        LoginUserDTO testUser = new LoginUserDTO()
        {
            Email = "test@gmail.com",
            Password = "12"
        };
        _validatorMock.Setup(v => v.ValidateAsync(It.IsAny<LoginUserDTO>(), CancellationToken.None)).ReturnsAsync(
        
            new ValidationResult()
            {
                Errors = new List<ValidationFailure>{ new("password", "invalid password")}
            }
        );

        //Act && Assert
        
        var ex = Assert.ThrowsAsync<ValidationException>( async () => await _authService.AuthUser(testUser)).Result;
        _outputHelper.WriteLine("" + ex);
    }

    [Fact]
    public void AuthUserShouldThrowUserNotFoundExceptionOnNotRegisteredEmailProvided()
    {
        //Arrange
        _validatorMock.Setup(v => v.ValidateAsync(It.IsAny<LoginUserDTO>(), CancellationToken.None)).ReturnsAsync(

            new ValidationResult()
        );
        _applicationContextMock.Setup(c => c.Users).ReturnsDbSet(new List<User>()
        {
            new()
            {
                Id = 1,
                Email = "registeredEmail",
                PasswordHash = "testPassword"
            }
        });
        //Act
        
        //Assert
        Assert.ThrowsAsync<UserNotFoundException>(async () => await _authService.AuthUser(new LoginUserDTO()
        {
            Email = "random@gmail.com",
            Password = "testPassword"
        }));
    }

    [Fact]
    public void AuthUserShouldThrowInvalidPasswordExceptionOnInvalidPassword()
    {
        var loginUser = new LoginUserDTO()
        {
            Email = "test@gmail.com",
            Password = "wrongPassword"
        };
        
        _validatorMock.Setup(v => v.ValidateAsync(It.IsAny<LoginUserDTO>(), CancellationToken.None)).ReturnsAsync(

            new ValidationResult()
        );
        _applicationContextMock.Setup(c => c.Users).ReturnsDbSet(new List<User>()
        {
            new()
            {
                Id = 1,
                Email = "test@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("correctPassword")
            }
        });
        Assert.ThrowsAsync<UserNotFoundException>(async () => await _authService.AuthUser(loginUser));
    }
    
    [Fact]
    public void AuthUserShouldAuthUserOnValidData()
    {
        
        //Arrange
        var loginUser = new LoginUserDTO()
        {
            Email = "registeredEmail@gmail.com",
            Password = "correctPassword"
        };
        
        _validatorMock.Setup(v => v.ValidateAsync(It.IsAny<LoginUserDTO>(), CancellationToken.None)).ReturnsAsync(

            new ValidationResult()
        );
        _applicationContextMock.Setup(c => c.Users).ReturnsDbSet(new List<User>()
        {
            new()
            {
                Id = 1,
                Email = "registeredEmail@gmail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("correctPassword")
            }
        });
        _configurationMock.Setup(c => c["JwtKey"])
            .Returns("Super secret key that will be stored somewhere secretly, so you will never know its real value");
        _mapperMock.Setup(m => m.Map<UserDTO>(It.IsAny<User>())).Returns((User entity) =>
            new UserDTO() { Email = entity.Email});
        //Act
        var authUser = _authService.AuthUser(loginUser);
        //Assert
        Assert.NotEmpty(authUser.Result.Token);
        Assert.Equal(authUser.Result.User.Email, loginUser.Email);
    }
    

}