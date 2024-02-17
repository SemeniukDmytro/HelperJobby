using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class JobSeekerServiceTests
{
    private readonly JobSeekerService _jobSeekerService;
    private readonly Mock<IJobSeekerQueryRepository> _jobSeekerQueryRepositoryMock = new();
    private readonly Mock<ISavedJobQueryRepository> _savedJobQueryRepository = new();
    private readonly Mock<IUserIdGetter> _userIdGetter = new();

    public JobSeekerServiceTests()
    {
        _jobSeekerService =
            new JobSeekerService(_jobSeekerQueryRepositoryMock.Object,
                _savedJobQueryRepository.Object, _userIdGetter.Object);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldReturnUpdatedJobSeekerAccount()
    {
        //Arrange
        var updatedAccount = JobSeekerFixture.UpdatedJobSeeker;
        var accountEntity = JobSeekerFixture.JobSeekerEntity;
        var jobSeekerId = 1;
        //Act
        _userIdGetter.Setup(u => u.CurrentJobSeekerId).Returns(jobSeekerId);
        _jobSeekerQueryRepositoryMock.Setup(jsr => jsr.GetJobSeekerByIdWithAddress(jobSeekerId))
            .ReturnsAsync(accountEntity);
        var result = await _jobSeekerService.UpdateJobSeeker(jobSeekerId, updatedAccount);
        //Assert
        Assert.Equal(updatedAccount.FirstName, result.FirstName);
        Assert.Equal(updatedAccount.Address.City, result.Address.City);
        Assert.Equal(accountEntity.UserId, result.UserId);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldThrowForbiddenExceptionIfNotCurrentUserTriesToUpdate()
    {
        //Arrange
        var updatedAccount = JobSeekerFixture.UpdatedJobSeeker;
        var userId = 1;
        var accountEntity = JobSeekerFixture.JobSeekerEntity;
        var jobSeekerId = 2;
        _userIdGetter.Setup(u => u.CurrentJobSeekerId).Returns(jobSeekerId);
        _jobSeekerQueryRepositoryMock.Setup(jsr => jsr.GetJobSeekerByIdWithAddress(jobSeekerId))
            .ReturnsAsync(accountEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobSeekerService.UpdateJobSeeker(userId, updatedAccount));
    }

    [Fact]
    public async Task SaveJobShouldReturnSavedJob()
    {
        //Arrange
        var jobSeekerId = 1;
        var jobId = 2;
        var jobSeekerAccountEntity = JobSeekerFixture.SecondJobSeekerEntity;
        _userIdGetter.Setup(u => u.CurrentJobSeekerId).Returns(jobSeekerId);
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
        var jobSeekerId = 1;
        var jobId = 1;
        _userIdGetter.Setup(u => u.CurrentJobSeekerId).Returns(jobSeekerId);
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
        var jobId = 1;
        var jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerFixture.JobSeekerEntity;
        _userIdGetter.Setup(u => u.CurrentJobSeekerId).Returns(jobSeekerId);
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