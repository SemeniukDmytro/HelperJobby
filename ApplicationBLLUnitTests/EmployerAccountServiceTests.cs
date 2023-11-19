using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class EmployerAccountServiceTests
{
    private readonly EmployerAccountService _employerAccountService;
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepositoryMock = new ();
    private readonly Mock<IOrganizationQueryRepository> _organizationQueryRepositoryMock = new();

    public EmployerAccountServiceTests()
    {
        _employerAccountService = new EmployerAccountService(_userServiceMock.Object, _employerAccountQueryRepositoryMock.Object,
            _organizationQueryRepositoryMock.Object);
    }

    [Fact]
    public async Task CreateShouldReturnCreatedAccountIfUserCreatesNewOrganization()
    {
        //Arrange
        var createdAccount = new EmployerAccount()
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization()
            {
                Name = "newOrganization"
            }
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationByName(createdAccount.Organization.Name))
            .ReturnsAsync((Organization?)null);
        //Act
        var account  = await _employerAccountService.CreateEmployerAccount(createdAccount);
        //Assert
        Assert.Equal(createdAccount.FullName, account.FullName);
        Assert.Equal(userId,  account.UserId);
        Assert.Equal(createdAccount.Organization.Name, account.Organization.Name);
    }
    
    [Fact]
    public async Task CreateShouldReturnCreatedAccountIfOrganizationAlreadyCreatedAndEmployerIsPartOfAnOrganization()
    {
        //Arrange
        var userId = 1;
        var organizationId = 1;
        var createdAccount = new EmployerAccount()
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization()
            {
                Name = "createdOrganization"
            }
        };
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Id = 1,
            Email = "test@gmail.com"

        };
        Organization organization = new Organization()
        {
            Id = organizationId,
            Name = "createdOrganization",
            EmployeeEmails = new List<OrganizationEmployeeEmail>()
            {
                employeeEmail
            }
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationByName(createdAccount.Organization.Name))
            .ReturnsAsync(organization);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organization.Id,
            "test@gmail.com")).ReturnsAsync(employeeEmail);
        //Act
        var account  = await _employerAccountService.CreateEmployerAccount(createdAccount);
        //Assert
        Assert.Equal(createdAccount.FullName, account.FullName);
        Assert.Equal(userId,  account.UserId);
        Assert.Equal(createdAccount.Organization.Name, organization.Name);
    }
    
    [Fact]
    public async Task CreateShouldThrowForbiddenExceptionIfEmailIsNotSpecifiedInOrganizationEmployeeEmails()
    {
        //Arrange
        var createdAccount = new EmployerAccount()
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization()
            {
                Name = "createdOrganization"
            }
        };
        var userId = 1;
        Organization organization = new Organization()
        {
            Name = "createdOrganization",
            EmployeeEmails = new List<OrganizationEmployeeEmail>()
            {
                new OrganizationEmployeeEmail()
                {
                    Email = "owner@gmail.com"
                }
            }
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationByName(createdAccount.Organization.Name))
            .ReturnsAsync(organization);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organization.Id,
            "test@gmail.com")).ReturnsAsync((OrganizationEmployeeEmail?)null);
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _employerAccountService.CreateEmployerAccount(createdAccount));
    }
    
    [Fact]
    public async Task UpdateShouldReturnUpdatedAccount()
    {
        //Arrange
        var updatedAccount = new EmployerAccount()
        {
            FullName = "oldName",
            Email = "test@gmail.com"
        };
        var userId = 1;
        var accountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployerAccount(accountId)).ReturnsAsync(
            new EmployerAccount()
            {
                UserId = userId,
                FullName = "oldName",
                Email = "oldContactEmail"
            });
        //Act
        var account  = await _employerAccountService.UpdateEmployerAccount(accountId, updatedAccount);
        //Assert
        Assert.Equal(updatedAccount.Email, account.Email);
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
            Email = "test@gmail.com"
        };
        var userId = 1;
        var accountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployerAccount(accountId)).ReturnsAsync(
            new EmployerAccount()
            {
                UserId = 2,
                FullName = "oldName",
                Email = "oldContactEmail"
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _employerAccountService.UpdateEmployerAccount(accountId, updatedAccount));

    }
    
    
}