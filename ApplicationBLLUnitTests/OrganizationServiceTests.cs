using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class OrganizationServiceTests
{
    private OrganizationService _organizationService;
    private Mock<IUserQueryRepository> _userQueryRepositoryMock = new();
    private Mock<IUserService> _userServiceMock = new();
    private Mock<IOrganizationQueryRepository> _organizationQueryRepositoryMock = new();

    public OrganizationServiceTests()
    {
        _organizationService = new OrganizationService(_userServiceMock.Object, _userQueryRepositoryMock.Object,
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
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com",
            OrganizationId = 1
        };
        var userId = 1;
        var organization = new Organization()
        {
            OrganizationOwnerId = 1,
            EmployeeEmails = new List<OrganizationEmployeeEmail>()
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationWithEmployeeEmails(employeeEmail.OrganizationId)).ReturnsAsync(
            organization);
        //Act
        var result = await _organizationService.AddEmployeeEmail(employeeEmail);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(employeeEmail.Email, result.Email);
        Assert.Equal(employeeEmail.OrganizationId, result.OrganizationId);
    }
    
    [Fact]
    public async Task AddEmployeeEmailShouldThrowForbiddenException()
    {
        //Arrange
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com",
            OrganizationId = 1
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationWithEmployeeEmails(employeeEmail.OrganizationId)).ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = 2,
                EmployeeEmails = new List<OrganizationEmployeeEmail>()
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _organizationService.AddEmployeeEmail(employeeEmail));
    }
    
    [Fact]
    public async Task RemoveEmployeeEmailShouldAddEmployeeEmail()
    {
        //Arrange
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Id = 1,
            Email = "test@gmail.com",
            OrganizationId = 1
        };
        var userId = 1;
        var organization = new Organization()
        {
            OrganizationOwnerId = 1,
            EmployeeEmails = new List<OrganizationEmployeeEmail>()
            {
                employeeEmail
            }
        };
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationWithEmployeeEmails(employeeEmail.OrganizationId)).ReturnsAsync(organization
            );
        //Act
        var result = await _organizationService.RemoveEmployeeEmail(employeeEmail);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(employeeEmail.Email, result.Email);
        Assert.Equal(employeeEmail.OrganizationId, result.OrganizationId);
    }
    
    [Fact]
    public async Task RemoveEmployeeEmailShouldThrowForbiddenException()
    {
        //Arrange
        var employeeEmail = new OrganizationEmployeeEmail()
        {
            Email = "test@gmail.com",
            OrganizationId = 1
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _organizationQueryRepositoryMock.Setup(r => r.GetOrganizationWithEmployeeEmails(employeeEmail.OrganizationId)).ReturnsAsync(
            new Organization()
            {
                OrganizationOwnerId = 2,
                EmployeeEmails = new List<OrganizationEmployeeEmail>()
                {
                    employeeEmail
                }
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _organizationService.AddEmployeeEmail(employeeEmail));
    }
}