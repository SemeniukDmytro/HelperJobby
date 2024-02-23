using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class JobApplyServiceTests
{
    private readonly Mock<IJobApplyQueryRepository> _jobApplyQueryRepositoryMock = new();
    private readonly IJobApplyService _jobApplyService;
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    private readonly Mock<IEmployerService> _employerServiceMock = new();
    private readonly Mock<IJobSeekerService> _jobSeekerServiceMock = new();

    public JobApplyServiceTests()
    {
        _jobApplyService = new JobApplyService(
            _jobApplyQueryRepositoryMock.Object, _jobQueryRepositoryMock.Object, _employerServiceMock.Object,
            _jobSeekerServiceMock.Object);
    }

    [Fact]
    public async Task GetJobAppliesForSpecifiedShouldReturnJob()
    {
        //Arrange
        var jobId = 1;
        var job = JobFixtures.FirstJobEntity;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobWithJobApplies(jobId)).ReturnsAsync(job);

        //Act
        var jobForJobApplies = await _jobApplyService.GetJobAppliesForSpecificJob(jobId);

        //Assert
        Assert.Equal(job.Id, jobForJobApplies.Id);
        Assert.Equal(job.JobTitle, jobForJobApplies.JobTitle);
    }

    [Fact]
    public async Task GetJobAppliesShouldThrowAnExceptionIfNotJobEmployerTriesToGet()
    {
        //Arrange
        var jobId = 2;
        var job = JobFixtures.SecondJobEntity;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobWithJobApplies(jobId)).ReturnsAsync(job);

        //Act && Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobApplyService.GetJobAppliesForSpecificJob(jobId));
    }


    [Fact]
    public async Task CreateJobApplyShouldReturnCreatedJobApply()
    {
        //Arrange
        var jobSeekerId = 1;
        var jobId = 1;
        var employerId = 1;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(employerId);
        _jobApplyQueryRepositoryMock.Setup(r => r.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ThrowsAsync(new JobApplyingException("You have already applied"));
        //Act
        var createdJobApply = await _jobApplyService.PostJobApply(jobId);
        //Assert
        Assert.Equal(jobSeekerId, createdJobApply.JobSeekerId);
        Assert.Equal(jobId, createdJobApply.JobId);
    }

    [Fact]
    public async Task CreateJobApplyShouldThrowJobApplyingExceptionIfJobSeekerAlreadyApplied()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        var jobSeekerAccount = JobSeekerFixture.JobSeekerEntity;
        var employerId = 1;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(employerId);
        _jobApplyQueryRepositoryMock.Setup(r => r.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new JobApply
            {
                JobId = 2,
                JobSeekerId = 1
            });
        //Act & Assert
        await Assert.ThrowsAsync
            <JobApplyingException>(async () => await _jobApplyService.PostJobApply(jobId));
    }

    [Fact]
    public async Task DeleteJobApplyShouldReturnJobApplyToDelete()
    {
        //Arrange
        var jobSeekerId = 1;
        var jobId = 2;
        var employerId = 1;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(employerId);
        _jobApplyQueryRepositoryMock.Setup(r => r.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new JobApply
            {
                JobId = 2,
                JobSeekerId = 1
            });
        //Act
        var createdJobApply = await _jobApplyService.DeleteJobApply(jobId);
        //Assert
        Assert.Equal(jobSeekerId, createdJobApply.JobSeekerId);
        Assert.Equal(jobId, createdJobApply.JobId);
    }
}