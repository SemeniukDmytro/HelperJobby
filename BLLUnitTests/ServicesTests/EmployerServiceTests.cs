using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class EmployerServiceTests
{
    private readonly Mock<IEmployerQueryRepository> _employerQueryRepositoryMock = new();
    private readonly EmployerService _employerService;
    private readonly Mock<IOrganizationQueryRepository> _organizationQueryRepositoryMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IUserIdGetter> _userIdGetter = new();

    public EmployerServiceTests()
    {
        _employerService = new EmployerService(_userServiceMock.Object,
            _employerQueryRepositoryMock.Object,
            _organizationQueryRepositoryMock.Object, _userIdGetter.Object);
    }

    [Fact]
    public async Task CreateShouldReturnCreatedAccountIfUserCreatesNewOrganization()
    {
        //Arrange
        var createdAccount = new Employer
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization
            {
                Name = "newOrganization"
            }
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationByName(createdAccount.Organization.Name))
            .ReturnsAsync((Organization?)null);
        //Act
        var account = await _employerService.CreateEmployer(createdAccount);
        //Assert
        Assert.Equal(createdAccount.FullName, account.FullName);
        Assert.Equal(userId, account.UserId);
        Assert.Equal(createdAccount.Organization.Name, account.Organization.Name);
    }

    [Fact]
    public async Task CreateShouldReturnCreatedAccountIfOrganizationAlreadyCreatedAndEmployerIsPartOfAnOrganization()
    {
        //Arrange
        var userId = 1;
        var organizationId = 1;
        var createdAccount = new Employer
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization
            {
                Name = "createdOrganization"
            }
        };
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Id = 1,
            Email = "test@gmail.com"
        };
        var organization = new Organization
        {
            Id = organizationId,
            Name = "createdOrganization",
            EmployeeEmails = new List<OrganizationEmployeeEmail>
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
        var account = await _employerService.CreateEmployer(createdAccount);
        //Assert
        Assert.Equal(createdAccount.FullName, account.FullName);
        Assert.Equal(userId, account.UserId);
        Assert.Equal(createdAccount.Organization.Name, organization.Name);
    }

    [Fact]
    public async Task CreateShouldThrowForbiddenExceptionIfEmailIsNotSpecifiedInOrganizationEmployeeEmails()
    {
        //Arrange
        var createdAccount = new Employer
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization
            {
                Name = "createdOrganization"
            }
        };
        var userId = 1;
        var organization = new Organization
        {
            Name = "createdOrganization",
            EmployeeEmails = new List<OrganizationEmployeeEmail>
            {
                new()
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
            await _employerService.CreateEmployer(createdAccount));
    }

    [Fact]
    public async Task CreateShouldThrowEmployerAccountAlreadyExistsExceptionIfAccountAlreadyHasBeenCrated()
    {
        //Arrange
        var createdAccount = new Employer
        {
            FullName = "test first",
            Email = "test@gmail.com",
            Organization = new Organization
            {
                Name = "createdOrganization"
            }
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(1);
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _employerService.CreateEmployer(createdAccount));
    }

    [Fact]
    public async Task UpdateShouldReturnUpdatedAccount()
    {
        //Arrange
        var updatedAccount = new Employer
        {
            FullName = "oldName",
            Email = "test@gmail.com"
        };
        var userId = 1;
        var accountId = 1;
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(accountId)).ReturnsAsync(
            new Employer
            {
                UserId = userId,
                FullName = "oldName",
                Email = "oldContactEmail"
            });
        //Act
        var account = await _employerService.UpdateEmployer(accountId, updatedAccount);
        //Assert
        Assert.Equal(updatedAccount.Email, account.Email);
        Assert.Equal(userId, account.UserId);
        Assert.Equal(updatedAccount.FullName, account.FullName);
    }

    [Fact]
    public async Task UpdateShouldThrownAnExceptionIfNotCurrentUserTriesToChangeAccount()
    {
        //Arrange
        var updatedAccount = new Employer
        {
            FullName = "oldName",
            Email = "test@gmail.com"
        };
        var userId = 1;
        var employerId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(employerId)).ReturnsAsync(
            new Employer
            {
                UserId = 2,
                FullName = "oldName",
                Email = "oldContactEmail"
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _employerService.UpdateEmployer(employerId, updatedAccount));
    }
}