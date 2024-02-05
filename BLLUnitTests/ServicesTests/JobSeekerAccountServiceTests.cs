using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class JobSeekerAccountServiceTests
{
    private readonly JobSeekerService _jobSeekerService;
    private readonly Mock<IJobSeekerQueryRepository> _jobSeekerQueryRepositoryMock = new();
    private readonly Mock<ISavedJobQueryRepository> _savedJobQueryRepository = new();
    private readonly Mock<IUserService> _userServiceMock = new();

    public JobSeekerAccountServiceTests()
    {
        _jobSeekerService =
            new JobSeekerService(_jobSeekerQueryRepositoryMock.Object, _userServiceMock.Object,
                _savedJobQueryRepository.Object);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldReturnUpdatedJobSeekerAccount()
    {
        //Arrange
        var updatedAccount = JobSeekerAccountFixture.UpdatedJobSeeker;
        var accountEntity = JobSeekerAccountFixture.JobSeekerEntity;
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerWithAddress(userId)).ReturnsAsync(
            accountEntity);
        //Act
        var result = await _jobSeekerService.UpdateJobSeeker(userId, updatedAccount);
        //Assert
        Assert.Equal(updatedAccount.FirstName, result.FirstName);
        Assert.Equal(updatedAccount.Address.City, result.Address.City);
        Assert.Equal(accountEntity.UserId, result.UserId);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldThrowForbiddenExceptionIfNotCurrentUserTriesToUpdate()
    {
        //Arrange
        var updatedAccount = JobSeekerAccountFixture.UpdatedJobSeeker;
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(2);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobSeekerService.UpdateJobSeeker(userId, updatedAccount));
    }

    [Fact]
    public async Task SaveJobShouldReturnSavedJob()
    {
        //Arrange
        var userId = 1;
        var jobId = 2;
        var jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepository.Setup(r => r.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ThrowsAsync(new JobSavingException("Saved job not found"));
        //Act
        var savedJob = await _jobSeekerService.SaveJob(jobId);
        //Assert
        Assert.Equal(jobId, savedJob.JobId);
        Assert.Equal(jobSeekerAccountEntity.Id, savedJob.JobSeekerId);
    }


    [Fact]
    public async Task SaveJobShouldThrowJobSavingExceptionIfJobAlreadySaved()
    {
        //Arrange
        var userId = 1;
        var jobId = 1;
        var jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepository.Setup(r => r.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new SavedJob());
        //Act & Assert
        await Assert.ThrowsAsync<JobSavingException>(async () =>
            await _jobSeekerService.SaveJob(jobId));
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldReturnSavedJob()
    {
        //Arrange
        var userId = 1;
        var jobId = 1;
        var jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepository.Setup(r => r.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new SavedJob
            {
                JobId = jobId,
                JobSeekerId = jobSeekerId
            });
        //Act
        var savedJob = await _jobSeekerService.RemoveJobFromSaved(jobId);
        //Assert
        Assert.Equal(jobId, savedJob.JobId);
        Assert.Equal(jobSeekerAccountEntity.Id, savedJob.JobSeekerId);
    }
}