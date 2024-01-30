using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;
using Xunit.Abstractions;

namespace BLLUnitTests.ServicesTests;

public class UserServiceTests
{
    private readonly ITestOutputHelper _outputHelper;
    private readonly Mock<IPasswordHandler> _passwordHandler = new();
    private readonly Mock<IUserQueryRepository> _userQueryRepository = new();
    private readonly UserService _userService;
    private readonly Mock<IUserIdGetter> _userIdGetter = new();

    public UserServiceTests(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        _userService =
            new UserService(_userIdGetter.Object, _userQueryRepository.Object, _passwordHandler.Object);
    }

    [Fact]
    public async Task CreateUserShouldReturnCreatedUserIfProvidedDataCorrect()
    {
        //Arrange
        var user = new User
        {
            Email = "newEmail@gmail.com",
            PasswordHash = "newPassword"
        };
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(true);
        //Act
        var createdUser = await _userService.CreateUser(user);
        //Assert
        Assert.Equal(user.Email, createdUser.Email);
    }

    [Fact]
    public async Task CreateUserShouldThrowAnExceptionIfEmailIsNotAvailable()
    {
        //Arrange
        var user = new User
        {
            Email = "registeredEmail@gmail.com",
            PasswordHash = "newPassword"
        };
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(false);
        //Act & Assert
        await Assert.ThrowsAsync<EmailIsNotAvailableException>(async () => await _userService.CreateUser(user));
    }

    [Fact]
    public async Task UpdateUserShouldUpdateUserEmailIfEmailIsAvailable()
    {
        //Arrange
        var updatedUser = new User
        {
            Email = "updatedemail@gmail.com"
        };
        _userQueryRepository.Setup(r => r.GetUserByIdPlain(It.IsAny<int>())).ReturnsAsync(new User
        {
            Email = "oldemail@gmail.com"
        });
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(true);
        //Act
        var userToUpdate = await _userService.UpdateUser(It.IsAny<int>(), updatedUser);
        //Assert
        Assert.Equal(updatedUser.Email, userToUpdate.Email);
    }

    [Fact]
    public async Task UpdateUserShouldThrowAnExceptionEmailIfEmailIsNotAvailable()
    {
        //Arrange
        var updatedUser = new User
        {
            Email = "usedEmail@gmail.com"
        };
        _userQueryRepository.Setup(r => r.GetUserByIdPlain(It.IsAny<int>())).ReturnsAsync(new User
        {
            Email = "oldemail@gmail.com"
        });
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(false);
        //Act & Assert
        await Assert.ThrowsAsync<EmailIsNotAvailableException>(async () =>
            await _userService.UpdateUser(It.IsAny<int>(), updatedUser));
    }

    [Fact]
    public async Task UpdateUserShouldUpdateUserPasswordAndUserAccount()
    {
        //Arrange
        var updatedUser = new User
        {
            Email = "oldemail@gmail.com",
            PasswordHash = "newPassword",
            AccountType = "Job seeker"
        };
        _userQueryRepository.Setup(r => r.GetUserByIdPlain(It.IsAny<int>())).ReturnsAsync(new User
        {
            Email = "oldemail@gmail.com",
            PasswordHash = "oldPassword",
            AccountType = "Employer"
        });
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(false);
        _passwordHandler.Setup(h => h.ChangePassword(It.IsAny<string>())).Returns(updatedUser.PasswordHash);
        //Act
        var userToUpdate = await _userService.UpdateUser(It.IsAny<int>(), updatedUser);
        //Assert
        Assert.Equal(updatedUser.PasswordHash, userToUpdate.PasswordHash);
        Assert.Equal(updatedUser.AccountType, userToUpdate.AccountType);
    }
}