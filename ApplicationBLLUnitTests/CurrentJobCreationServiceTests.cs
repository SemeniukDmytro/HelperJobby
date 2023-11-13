using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class CurrentJobCreationServiceTests
{
    private readonly CurrentJobCreationService _currentJobCreationService;
    private readonly Mock<IUserService> _userServiceMock = new ();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepositoryMock = new();
    private readonly Mock<ICurrentJobCreationQueryRepository> _currentJobCreationQueryRepository = new();

    public CurrentJobCreationServiceTests()
    {
        _currentJobCreationService = new CurrentJobCreationService(_userServiceMock.Object, _employerAccountQueryRepositoryMock.Object,
            _currentJobCreationQueryRepository.Object);
    }
    

    [Fact]
    public async Task StartJobCreationShouldReturnCreatedCurrentJob()
    {
        //Arrange
        var newJob = new CurrentJobCreation()
        {
            JobTitle = "new Job",
            NumberOfOpenings = 4,
            Language = "English",
            Location = "random street, random city"
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployerAccountWithCurrentJobCreation(userId))
            .ReturnsAsync(new EmployerAccount()
            {
                Id = 2
            });
        //Act
        var job = await _currentJobCreationService.StartJobCreation(newJob);
        //Assert
        Assert.Equal(newJob.NumberOfOpenings, job.NumberOfOpenings);
        Assert.Equal(2, job.EmployerAccountId);
    }
    
    [Fact]
    public async Task StartJobCreationShouldThrowForbiddenExceptionIfUserAlreadyHaveCurrentJob()
    {
        //Arrange
        var newJob = new CurrentJobCreation()
        {
            JobTitle = "new Job",
            NumberOfOpenings = 4,
            Language = "English",
            Location = "random street, random city"
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _employerAccountQueryRepositoryMock.Setup(r => r.GetEmployerAccountWithCurrentJobCreation(userId))
            .ReturnsAsync(new EmployerAccount()
            {
                Id = 2,
                CurrentJobCreation = new CurrentJobCreation()
                {
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city"
                }
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _currentJobCreationService.StartJobCreation(newJob));
    }
    
    [Fact]
    public async Task UpdateJobCreationShouldReturnUpdatedCurrentJob()
    {
        //Arrange
        var newJob = new CurrentJobCreation
        {
            JobTypes = default,Salary = 1000,
            Benefits = (EmployeeBenefits)3
        };
        var userId = 1;
        var jobId = 1;
        var employerAccountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _currentJobCreationQueryRepository.Setup(r => r.GetJobCreationById(jobId))
            .ReturnsAsync(new CurrentJobCreation()
            {
                Id = jobId,
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city",
                EmployerAccountId = employerAccountId
            });
        //Act
        var job = await _currentJobCreationService.UpdateCurrentJob(jobId, employerAccountId, newJob);
        //Assert
        Assert.Equal("new Job", job.JobTitle);
        Assert.Equal(newJob.Salary, job.Salary);
        Assert.Equal(employerAccountId, job.EmployerAccountId);
        Assert.Equal(jobId, job.Id);
    }
    
    [Fact]
    public async Task UpdateJobCreationShouldThrowForbiddenExceptionIfNotCurrentEmployerTriesToUpdate()
    {
        //Arrange
        var newJob = new CurrentJobCreation()
        {
            Salary = 1000,
            Benefits = (EmployeeBenefits)3
        };
        var userId = 1;
        var jobId = 1;
        var employerAccountId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _currentJobCreationQueryRepository.Setup(r => r.GetJobCreationById(jobId))
            .ReturnsAsync(new CurrentJobCreation()
            {
                Id = jobId,
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city",
                EmployerAccountId = 2
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _currentJobCreationService.UpdateCurrentJob(jobId, employerAccountId, newJob));
    }

    [Fact]
    public async Task DeleteJobShouldReturnJobToDelete()
    {
        //Arrange
        int jobId = 1;
        int employerId = 1;
        _currentJobCreationQueryRepository.Setup(r => r.GetJobCreationById(jobId)).ReturnsAsync(
            new CurrentJobCreation()
            {
                Id = jobId,
                JobTitle = "Test",
                EmployerAccountId = employerId
            });
        
        //Act
        var job = await _currentJobCreationService.DeleteCurrenJob(jobId, employerId);
        //Assert
        Assert.Equal("Test", job.JobTitle);
        Assert.Equal(jobId, job.Id);
        Assert.Equal(employerId, job.EmployerAccountId);
    }
    
    [Fact]
    public async Task DeleteJobShouldThrowForbiddentException()
    {
        //Arrange
        int jobId = 1;
        int employerId = 1;
        _currentJobCreationQueryRepository.Setup(r => r.GetJobCreationById(jobId)).ReturnsAsync(
            new CurrentJobCreation()
            {
                Id = jobId,
                JobTitle = "Test",
                EmployerAccountId = 2
            });
        
        //Act
        //Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _currentJobCreationService.DeleteCurrenJob(jobId, employerId));
    }
}