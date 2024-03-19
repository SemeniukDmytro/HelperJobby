using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class OrganizationServiceTests
{
    private readonly Mock<IEmployerQueryRepository> _employerQueryRepositoryMock = new();
    private readonly Mock<IEmployerService> _employerServiceMock = new();
    private readonly Mock<IOrganizationQueryRepository> _organizationQueryRepositoryMock = new();
    private readonly OrganizationService _organizationService;

    public OrganizationServiceTests()
    {
        _organizationService = new OrganizationService(_organizationQueryRepositoryMock.Object,
            _employerQueryRepositoryMock.Object,
            _employerServiceMock.Object);
    }

    [Fact]
    public async Task UpdateShouldReturnUpdatedOrganization()
    {
        //Arrange
        var updatedOrganization = new Organization
        {
            PhoneNumber = "+123456789",
            NumberOfEmployees = 14
        };
        var employerId = 1;
        var organizationId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerByIdWithOrganization(employerId))
            .ReturnsAsync(EmployerFixtures.EmployerEntity);
        //Act
        var organization = await _organizationService.UpdateOrganization(organizationId, updatedOrganization);
        //Assert
        Assert.Equal(updatedOrganization.PhoneNumber, organization.PhoneNumber);
        Assert.Equal(updatedOrganization.NumberOfEmployees, organization.NumberOfEmployees);
    }

    [Fact]
    public async Task UpdateShouldThrowForbiddenExceptionIfCurrentEmployerIsNotOrganizationOwner()
    {
        //Arrange
        var updatedOrganization = new Organization
        {
            PhoneNumber = "+123456789",
            NumberOfEmployees = 14
        };
        var employerId = 1;
        var organizationId = 2;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerByIdWithOrganization(employerId))
            .ReturnsAsync(EmployerFixtures.SecondEmployerEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _organizationService.UpdateOrganization(organizationId, updatedOrganization));
    }

    [Fact]
    public async Task AddEmployeeEmailShouldReturnEmployeeEmail()
    {
        //Arrange
        var organizationId = 1;
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Email = "test@gmail.com"
        };
        var employerId = 1;
        var organization = new Organization();
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _employerQueryRepositoryMock.Setup(eq => eq.GetEmployerById(employerId))
            .ReturnsAsync(EmployerFixtures.EmployerEntity);
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
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Email = "test@gmail.com"
        };
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(employerId))
            .ReturnsAsync(EmployerFixtures.SecondEmployerEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _organizationService.AddEmployeeEmail(organizationId, employeeEmail));
    }

    [Fact]
    public async Task AddEmployeeEmailShouldThrowForbiddenExceptionIfEmailAlreadyBeenAdded()
    {
        //Arrange
        var organizationId = 1;
        var employerId = 1;
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Email = "test@gmail.com"
        };
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(employerId))
            .ReturnsAsync(EmployerFixtures.EmployerEntity);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmailByOrganizationId(organizationId,
            employeeEmail.Email)).ReturnsAsync(employeeEmail);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _organizationService.AddEmployeeEmail(organizationId, employeeEmail));
    }

    [Fact]
    public async Task RemoveEmployeeEmailShouldAddEmployeeEmail()
    {
        //Arrange
        var emailId = 1;
        var employerId = 1;
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Id = emailId,
            Email = "testToRemove@gmail.com",
            OrganizationId = 1
        };

        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmail(emailId))
            .ReturnsAsync(employeeEmail);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(employerId))
            .ReturnsAsync(EmployerFixtures.EmployerEntity);
        //Act
        var result = await _organizationService.RemoveEmployeeEmail(emailId);
        // Assert
        Assert.NotNull(result);
        Assert.Equal(employeeEmail.Email, result.Email);
        Assert.Equal(employeeEmail.OrganizationId, result.OrganizationId);
    }

    [Fact]
    public async Task RemoveEmployeeEmailShouldThrowForbiddenException()
    {
        //Arrange
        var employeeEmailId = 1;
        var employerId = 1;
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Email = "test@gmail.com",
            OrganizationId = 2,
            Organization = new Organization()
        };

        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmail(employeeEmailId))
            .ReturnsAsync(employeeEmail);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(employerId))
            .ReturnsAsync(EmployerFixtures.SecondEmployerEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _organizationService.RemoveEmployeeEmail(employeeEmailId));
    }

    [Fact]
    public async Task RemoveEmployeeEmailShouldThrowForbiddenExceptionIfCurrentUserRemovesHisEmail()
    {
        //Arrange
        var emailId = 1;
        var employerId = 1;
        var organization = new Organization();
        var employeeEmail = new OrganizationEmployeeEmail
        {
            Id = emailId,
            Email = "test@gmail.com",
            Organization = organization
        };


        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _organizationQueryRepositoryMock.Setup(r => r.GetEmployeeEmail(emailId))
            .ReturnsAsync(employeeEmail);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployerById(employerId))
            .ReturnsAsync(EmployerFixtures.EmployerEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(
            async () => await _organizationService.RemoveEmployeeEmail(emailId));
    }
}