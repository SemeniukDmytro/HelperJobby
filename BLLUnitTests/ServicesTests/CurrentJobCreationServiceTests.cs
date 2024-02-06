using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class CurrentJobCreationServiceTests
{
    private readonly Mock<IIncompleteJobQueryRepository> _currentJobCreationQueryRepository = new();
    private readonly IncompleteJobService _incompleteJobService;
    private readonly Mock<IEmployerQueryRepository> _employerAccountQueryRepositoryMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();

    public CurrentJobCreationServiceTests()
    {
        _incompleteJobService = new IncompleteJobService(_userServiceMock.Object,
            _employerAccountQueryRepositoryMock.Object,
            _currentJobCreationQueryRepository.Object);
    }


    [Fact]
    public async Task StartJobCreationShouldReturnCreatedCurrentJob()
    {
        //Arrange
        var newJob = new IncompleteJob
        {
            JobTitle = "new Job",
            NumberOfOpenings = 4,
            Language = "English",
            Location = "random street, random city"
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        //Act
        var job = await _incompleteJobService.StartIncompleteJobCreation(newJob);
        //Assert
        Assert.Equal(newJob.NumberOfOpenings, job.NumberOfOpenings);
        Assert.Equal(2, job.EmployerId);
    }
    

    [Fact]
    public async Task UpdateJobCreationShouldReturnUpdatedCurrentJob()
    {
        //Arrange
        var newJob = new IncompleteJob
        {
            JobTypes = default, 
            Salary = new IncompleteJobSalary()
            {
                MinimalAmount = 1000
            },
            Benefits = (EmployeeBenefits)3
        };
        var userId = 1;
        var jobId = 1;
        var employerAccountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployer(userId)).ReturnsAsync(
            EmployerAccountFixtures.EmployerEntity);
        _currentJobCreationQueryRepository.Setup(r => r.GetIncompleteJobById(jobId))
            .ReturnsAsync(new IncompleteJob
            {
                Id = jobId,
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city",
                EmployerId = employerAccountId
            });
        //Act
        var job = await _incompleteJobService.UpdateIncompleteJob(jobId, newJob);
        //Assert
        Assert.Equal("new Job", job.JobTitle);
        Assert.Equal(newJob.Salary.MinimalAmount, job.Salary.MinimalAmount);
        Assert.Equal(employerAccountId, job.EmployerId);
        Assert.Equal(jobId, job.Id);
    }

    [Fact]
    public async Task UpdateJobCreationShouldThrowForbiddenExceptionIfNotCurrentEmployerTriesToUpdate()
    {
        //Arrange
        var newJob = new IncompleteJob
        {
            Benefits = (EmployeeBenefits)3
        };
        var userId = 1;
        var jobId = 1;
        var employerAccountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployer(userId)).ReturnsAsync(
            EmployerAccountFixtures.EmployerEntity);
        _currentJobCreationQueryRepository.Setup(r => r.GetIncompleteJobById(jobId))
            .ReturnsAsync(new IncompleteJob
            {
                Id = jobId,
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city",
                EmployerId = 2
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _incompleteJobService.UpdateIncompleteJob(jobId, newJob));
    }

    [Fact]
    public async Task DeleteJobShouldReturnJobToDelete()
    {
        //Arrange
        var jobId = 1;
        var userId = 1;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployer(userId)).ReturnsAsync(
            EmployerAccountFixtures.EmployerEntity);
        _currentJobCreationQueryRepository.Setup(r => r.GetIncompleteJobById(jobId)).ReturnsAsync(
            new IncompleteJob
            {
                Id = jobId,
                JobTitle = "Test",
                EmployerId = 1
            });

        //Act
        var job = await _incompleteJobService.DeleteIncompleteJob(jobId);
        //Assert
        Assert.Equal("Test", job.JobTitle);
        Assert.Equal(jobId, job.Id);
        Assert.Equal(1, job.EmployerId);
    }

    [Fact]
    public async Task DeleteJobShouldThrowForbiddenException()
    {
        //Arrange
        var jobId = 1;
        var userId = 1;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployer(userId)).ReturnsAsync(
            EmployerAccountFixtures.EmployerEntity);
        _currentJobCreationQueryRepository.Setup(r => r.GetIncompleteJobById(jobId)).ReturnsAsync(
            new IncompleteJob
            {
                Id = jobId,
                JobTitle = "Test",
                EmployerId = 2
            });

        //Act
        //Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _incompleteJobService.DeleteIncompleteJob(jobId));
    }
}