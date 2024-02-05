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
    private readonly Mock<IEmployerQueryRepository> _employerQueryRepositoryMock = new();
    private readonly Mock<IJobApplyQueryRepository> _jobApplyQueryRepositoryMock = new();
    private readonly IJobApplyService _jobApplyService;
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerQueryRepository> _jobSeekerQueryRepository = new();
    private readonly Mock<IUserService> _userServiceMock = new();

    public JobApplyServiceTests()
    {
        _jobApplyService = new JobApplyService(_userServiceMock.Object, _jobSeekerQueryRepository.Object,
            _jobApplyQueryRepositoryMock.Object, _employerQueryRepositoryMock.Object, _jobQueryRepositoryMock.Object);
    }

    [Fact]
    public async Task GetJobAppliesForSpecifiedShouldReturnJob()
    {
        //Arrange
        var jobId = 1;
        var userId = 1;
        var employer = EmployerAccountFixtures.EmployerEntity;
        var job = JobFixtures.FirstJobEntity;

        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployer(userId))
            .ReturnsAsync(employer);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);

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
        var userId = 1;
        var employer = EmployerAccountFixtures.EmployerEntity;
        var job = JobFixtures.SecondJobEntity;

        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _employerQueryRepositoryMock.Setup(r => r.GetEmployer(userId))
            .ReturnsAsync(employer);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);

        //Act && Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobApplyService.GetJobAppliesForSpecificJob(jobId));
    }


    [Fact]
    public async Task CreateJobApplyShouldReturnCreatedJobApply()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobApplyQueryRepositoryMock.Setup(r => r.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ThrowsAsync(new JobApplyingException("You have already applied"));
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerByUserId(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
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
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerEntity;
        var job = JobFixtures.FirstJobEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobApplyQueryRepositoryMock.Setup(r => r.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new JobApply
            {
                JobId = 2,
                JobSeekerId = 1
            });
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerByUserId(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync
            <JobApplyingException>(async () => await _jobApplyService.PostJobApply(jobId));
    }

    [Fact]
    public async Task DeleteJobApplyShouldReturnJobApplyToDelete()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerEntity;
        _jobApplyQueryRepositoryMock.Setup(r => r.GetJobApplyByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new JobApply
            {
                JobId = 2,
                JobSeekerId = 1
            });
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerByUserId(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act
        var createdJobApply = await _jobApplyService.DeleteJobApply(jobId);
        //Assert
        Assert.Equal(jobSeekerId, createdJobApply.JobSeekerId);
        Assert.Equal(jobId, createdJobApply.JobId);
    }
}