using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class JobServiceTests
{
    private readonly IJobService _jobService;
    private readonly Mock<IJobQueryRepository> _jobQueryRepository = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepository = new();
    private readonly Mock<IContentIndexingService> _contentIndexingServiceMock = new();

    public JobServiceTests()
    {
        _jobService = new JobService( _jobQueryRepository.Object, _userServiceMock.Object,
            _employerAccountQueryRepository.Object, _contentIndexingServiceMock.Object);
    }
    
    [Fact]
    public async Task CreateJobShouldReturnCreatedJob()
    {
        //Arrange
        var validJob = JobFixtures.CreatedJob;
        //Act
        var jobToCreate = await _jobService.CreateJob(validJob);
        //Assert
        Assert.Equal(validJob.JobTitle, jobToCreate.JobTitle);
    }

    [Fact]
    public async Task CreateJobShouldThrowJobNotValidExceptionIfJobNotProvidedWithSomeProperty()
    {
        //Arrange
        var invalidJob = JobFixtures.InvalidCreatedJob;
        //Act & assert
        await Assert.ThrowsAsync<JobNotValidException>(async () => await _jobService.CreateJob(invalidJob));
    }

    [Fact]
    public async Task UpdateJobShouldReturnUpdatedJob()
    {
        //Arrange
        var jobEntity = JobFixtures.FirstJobEntity;
        var updatedJob = JobFixtures.UpdatedJob;
        var jobId = 1;
        var employerAccount = EmployerAccountFixtures.EmployerAccountEntity;
        var currentUserId = 1;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId)).ReturnsAsync(employerAccount);
        _jobQueryRepository.Setup(r => r.GetJobById(jobId))
            .ReturnsAsync(jobEntity);
        //Act
        var job = await _jobService.UpdateJob(jobId, updatedJob);
        //Assert
        Assert.Equal(updatedJob.JobTitle, job.JobTitle);
        Assert.Equal(updatedJob.Salary, job.Salary);
        Assert.Equal(employerAccount.Id, job.EmployerAccountId);
        Assert.Equal(jobId, job.Id);
    }

    [Fact]
    public async Task UpdateJobShouldThrowForbiddenExceptionIfOtherEmployerTriesToChangeJob()
    {
        //Arrange
        var jobEntity = JobFixtures.SecondJobEntity;
        var updatedJob = JobFixtures.UpdatedJob;
        var jobId = 2;
        var employerAccount = EmployerAccountFixtures.EmployerAccountEntity;
        var currentUserId = 1;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId)).ReturnsAsync(employerAccount);
        _jobQueryRepository.Setup(r => r.GetJobById(jobId))
            .ReturnsAsync(jobEntity);
        //Act & assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobService.UpdateJob(jobId, updatedJob));
    }

    [Fact]
    public async Task DeleteJobShouldReturnJobToDelete()
    {
        //Arrange
        var jobEntity = JobFixtures.FirstJobEntity;
        int jobId = 1;
        var employerAccount = EmployerAccountFixtures.EmployerAccountEntity;
        var currentUserId = 1;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId)).ReturnsAsync(employerAccount);
        _jobQueryRepository.Setup(r => r.GetJobById(jobId))
            .ReturnsAsync(jobEntity);
        
        //Act
        var job = await _jobService.DeleteJob(jobId);
        //Assert
        Assert.Equal(jobEntity.JobTitle, job.JobTitle);
        Assert.Equal(jobEntity.Id, job.Id);
        Assert.Equal(jobEntity.EmployerAccountId, job.EmployerAccountId);
    }
    
    [Fact]
    public async Task DeleteJobShouldThrowForbiddenExceptionIfOtherEmployerTriesToDeleteJob()
    {
        //Arrange
        var jobEntity = JobFixtures.SecondJobEntity;
        var jobId = 2;
        var employerAccount = EmployerAccountFixtures.EmployerAccountEntity;
        var currentUserId = 1;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(currentUserId);
        _employerAccountQueryRepository.Setup(r => r.GetEmployerAccount(currentUserId)).ReturnsAsync(employerAccount);
        _jobQueryRepository.Setup(r => r.GetJobById(jobId))
            .ReturnsAsync(jobEntity);
        
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _jobService.DeleteJob(jobId));
    }
}