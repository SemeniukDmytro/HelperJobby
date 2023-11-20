using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class OrganizationServiceTests
{
    private OrganizationService _organizationService;
    private Mock<IUserService> _userServiceMock = new();
    private Mock<IOrganizationQueryRepository> _organizationQueryRepositoryMock = new();

    public OrganizationServiceTests()
    {
        _organizationService = new OrganizationService(_userServiceMock.Object,
            _organizationQueryRepositoryMock.Object);
    }
    
    [Fact]
    public async Task UpdateShouldReturnUpdatedOrganization()
    {
        //Arrange
        var updatedOrganization = new Organization()
        {
            PhoneNumber = "+123456789",
            NumberOfEmployees = 14
        };
        var userId = 1;
        var organizationId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId)).ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = userId,
                PhoneNumber = "+987654321",
                NumberOfEmployees = 16
            });
        //Act
        var organization  = await _organizationService.UpdateOrganization(organizationId, updatedOrganization);
        //Assert
        Assert.Equal(updatedOrganization.PhoneNumber, organization.PhoneNumber);
        Assert.Equal(userId,  organization.OrganizationOwnerId);
        Assert.Equal(updatedOrganization.NumberOfEmployees, organization.NumberOfEmployees);

    }
    
    [Fact]
    public async Task UpdateShouldThrowForbiddenExceptionIfCurrentUserIsNotOrganizationOwner()
    {
        //Arrange
        var updatedOrganization = new Organization()
        {
            PhoneNumber = "+123456789",
            NumberOfEmployees = 14
        };
        var userId = 1;
        var organizationId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId)).ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = 2,
                PhoneNumber = "+987654321",
                NumberOfEmployees = 16
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _organizationService.UpdateOrganization(organizationId, updatedOrganization));
    }
    
    [Fact]
    public async Task AddEmployeeEmailShouldReturnEmployeeEmail()
    {
        //Arrange
        var organizationId = 1;
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com"
        };
        var userId = 1;
        var organization = new Organization()
        {
            OrganizationOwnerId = 1
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId)).ReturnsAsync(
            organization);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organizationId,
            employeeEmail.Email)).ReturnsAsync((OrganizationEmployeeEmail?)null);
        //Act
        var result = await _organizationService.AddEmployeeEmail(organizationId, employeeEmail);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(employeeEmail.Email, result.Email);
        Assert.Equal(employeeEmail.OrganizationId, result.OrganizationId);
    }
    
    [Fact]
    public async Task AddEmployeeEmailShouldThrowForbiddenException()
    {
        //Arrange
        var organizationId = 1;
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com"
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId)).ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = 2
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _organizationService.AddEmployeeEmail(organizationId, employeeEmail));
    }
    
    [Fact]
    public async Task AddEmployeeEmailShouldThrowForbiddenExceptionIfEmailAlreadyBeenAdded()
    {
        //Arrange
        var organizationId = 1;
        var userId = 1;
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com"
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId)).ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = 1
            });
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organizationId,
            employeeEmail.Email)).ReturnsAsync(employeeEmail);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _organizationService.AddEmployeeEmail(organizationId, employeeEmail));
    }
    
    [Fact]
    public async Task RemoveEmployeeEmailShouldAddEmployeeEmail()
    {
        //Arrange
        var organizationId = 1;
        var userId = 1;
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Id = 1,
            Email = "test@gmail.com"
        };
        var organization = new Organization()
        {
            OrganizationOwnerId = 1
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId))
            .ReturnsAsync(organization);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organizationId,
            employeeEmail.Email)).ReturnsAsync(employeeEmail);
        //Act
        var result = await _organizationService.RemoveEmployeeEmail(organizationId, employeeEmail);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(employeeEmail.Email, result.Email);
        Assert.Equal(employeeEmail.OrganizationId, result.OrganizationId);
    }
    
    [Fact]
    public async Task RemoveEmployeeEmailShouldThrowForbiddenException()
    {
        //Arrange
        var organizationId = 1;
        var userId = 1;
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com",
            OrganizationId = 1
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId))
            .ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = 2
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _organizationService.RemoveEmployeeEmail(organizationId, employeeEmail));
    }
    
    [Fact]
    public async Task RemoveEmployeeEmailShouldThrowForbiddenExceptionIfThereIsntSuchEmployeeInOrganization()
    {
        //Arrange
        var organizationId = 1;
        var userId = 1;
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com",
            OrganizationId = 1
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationPlain(organizationId))
            .ReturnsAsync(
                new Organization()
                {
                    OrganizationOwnerId = 1
                });
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organizationId,
            employeeEmail.Email)).ReturnsAsync((OrganizationEmployeeEmail?)null);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _organizationService.RemoveEmployeeEmail(organizationId, employeeEmail));
    }
}