using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class JobServiceTests
{
    private readonly Mock<IJobQueryRepository> _jobQueryRepository = new();
    private readonly IJobService _jobService;
    private readonly Mock<IEmployerService> _employerServiceMock = new();
    

    public JobServiceTests()
    {
        _jobService = new JobService(_jobQueryRepository.Object, _employerServiceMock.Object);
    }

    [Fact]
    public async Task CreateJobShouldReturnCreatedJob()
    {
        //Arrange
        var validJob = JobFixtures.CreatedJobWithEmployer;
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
        await Assert.ThrowsAsync<InvalidJobException>(async () => await _jobService.CreateJob(invalidJob));
    }

    [Fact]
    public async Task UpdateJobShouldReturnUpdatedJob()
    {
        //Arrange
        var jobEntity = JobFixtures.FirstJobEntity;
        var updatedJob = JobFixtures.UpdatedJob;
        var jobId = 1;
        var employerAccount = EmployerFixtures.EmployerEntity;
        var employerId = 1;
        _employerServiceMock.Setup(s => s.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepository.Setup(r => r.GetJobByIdWithEmployer(jobId))
            .ReturnsAsync(jobEntity);
        //Act
        var job = await _jobService.UpdateJob(jobId, updatedJob);
        //Assert
        Assert.Equal(updatedJob.JobTitle, job.JobTitle);
        Assert.Equal(updatedJob.Salary.MinimalAmount, job.Salary.MinimalAmount);
        Assert.Equal(employerAccount.Id, job.EmployerId);
        Assert.Equal(jobId, job.Id);
    }

    [Fact]
    public async Task UpdateJobShouldThrowForbiddenExceptionIfOtherEmployerTriesToChangeJob()
    {
        //Arrange
        var jobEntity = JobFixtures.SecondJobEntity;
        var updatedJob = JobFixtures.UpdatedJob;
        var jobId = 2;
        var employerId = 1;
        _employerServiceMock.Setup(s => s.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepository.Setup(r => r.GetJobByIdWithEmployer(jobId))
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
        var jobId = 1;
        var employerId = 1;
        _employerServiceMock.Setup(s => s.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepository.Setup(r => r.GetJobByIdWithEmployer(jobId))
            .ReturnsAsync(jobEntity);

        //Act
        var job = await _jobService.DeleteJob(jobId);
        //Assert
        Assert.Equal(jobEntity.JobTitle, job.JobTitle);
        Assert.Equal(jobEntity.Id, job.Id);
        Assert.Equal(jobEntity.EmployerId, job.EmployerId);
    }

    [Fact]
    public async Task DeleteJobShouldThrowForbiddenExceptionIfOtherEmployerTriesToDeleteJob()
    {
        //Arrange
        var jobEntity = JobFixtures.SecondJobEntity;
        var jobId = 2;
        var employerId = 1;
        _employerServiceMock.Setup(s => s.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepository.Setup(r => r.GetJobByIdWithEmployer(jobId))
            .ReturnsAsync(jobEntity);

        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _jobService.DeleteJob(jobId));
    }
}