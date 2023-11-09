using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class EmployerAccountServiceTests
{
    private readonly EmployerAccountService _employerAccountService;
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepositoryMock = new ();

    public EmployerAccountServiceTests()
    {
        _employerAccountService = new EmployerAccountService(_userServiceMock.Object, _employerAccountQueryRepositoryMock.Object);
    }

    [Fact]
    public async Task CreateShouldReturnCreatedAccount()
    {
        //Arrange
        var createdAccount = new EmployerAccount()
        {
            FullName = "test first",
            ContactEmail = "test@gmail.com"
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        //Act
        var account  = await _employerAccountService.CreateEmployerAccount(createdAccount);
        //Assert
        Assert.Equal(createdAccount.FullName, account.FullName);
        Assert.Equal(userId,  account.UserId);

    }
    
    [Fact]
    public async Task UpdateShouldReturnUpdatedAccount()
    {
        //Arrange
        var updatedAccount = new EmployerAccount()
        {
            FullName = "oldName",
            ContactEmail = "test@gmail.com"
        };
        var userId = 1;
        var accountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployerAccount(accountId)).ReturnsAsync(
            new EmployerAccount()
            {
                UserId = userId,
                FullName = "oldName",
                ContactEmail = "oldContactEmail"
            });
        //Act
        var account  = await _employerAccountService.UpdateEmployerAccount(accountId, updatedAccount);
        //Assert
        Assert.Equal(updatedAccount.ContactEmail, account.ContactEmail);
        Assert.Equal(userId,  account.UserId);
        Assert.Equal(updatedAccount.FullName, account.FullName);

    }
    
    [Fact]
    public async Task UpdateShouldThrownAnExceptionIfNotCurrentUserTriesToChangeAccount()
    {
        //Arrange
        var updatedAccount = new EmployerAccount()
        {
            FullName = "oldName",
            ContactEmail = "test@gmail.com"
        };
        var userId = 1;
        var accountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployerAccount(accountId)).ReturnsAsync(
            new EmployerAccount()
            {
                UserId = 2,
                FullName = "oldName",
                ContactEmail = "oldContactEmail"
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _employerAccountService.UpdateEmployerAccount(accountId, updatedAccount));

    }
    
    
}