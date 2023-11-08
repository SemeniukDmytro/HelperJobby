using ApplicationBLL.Interfaces;
using ApplicationBLL.Services.UserService;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;
using Xunit.Abstractions;

namespace ApplicationBLLUnitTests;

public class UserServiceTests
{
    private readonly UserService _userService;
    private Mock<IUserCommandRepository> _userCommandRepository = new();
    private Mock<IUserIdGetter> _userIdGetter = new();
    private readonly Mock<IUserQueryRepository> _userQueryRepository = new();
    private readonly ITestOutputHelper _outputHelper;

    public UserServiceTests(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
        _userService =
            new UserService(_userIdGetter.Object, _userCommandRepository.Object, _userQueryRepository.Object);
    }

    [Fact]
    public async Task CreateUserShouldReturnCreatedUserIfProvidedDataCorrect()
    {
        var user = new User()
        {
            Email = "newEmail@gmail.com",
            PasswordHash = "newPassword"
        };
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(true);

        var createdUser = await _userService.CreateUser(user);
        
        Assert.Equal(user.Email, createdUser.Email);
    }

    [Fact] 
    public async Task CreateUserShouldThrowAnExceptionIfEmailIsNotAvailable()
    {
        var user = new User()
        {
            Email = "registeredEmail@gmail.com",
            PasswordHash = "newPassword"
        };
        _userQueryRepository.Setup(r => r.IsEmailAvailable(It.IsAny<string>())).ReturnsAsync(false);

        await Assert.ThrowsAsync<EmailIsNotAvailable>( async () => await _userService.CreateUser(user));
    }
    
    
}