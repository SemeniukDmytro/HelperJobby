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
    private readonly JobSeekerAccountService _jobSeekerAccountService;
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerQueryRepositoryMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<ISavedJobQueryRepository> _savedJobQueryRepository = new();
    
    public JobSeekerAccountServiceTests()
    {
        _jobSeekerAccountService =
            new JobSeekerAccountService(_jobSeekerQueryRepositoryMock.Object, _userServiceMock.Object,
                _savedJobQueryRepository.Object);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldReturnUpdatedJobSeekerAccount()
    {
        //Arrange
        var updatedAccount = JobSeekerAccountFixture.UpdatedJobSeekerAccount;
        var accountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountWithAddress(userId)).ReturnsAsync(
            accountEntity);
        //Act
        var result = await _jobSeekerAccountService.UpdateJobSeekerAccount(userId, updatedAccount);
        //Assert
        Assert.Equal(updatedAccount.FirstName, result.FirstName);
        Assert.Equal(updatedAccount.Address.City, result.Address.City);
        Assert.Equal(accountEntity.UserId, result.UserId);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldThrowForbiddenExceptionIfNotCurrentUserTriesToUpdate()
    {
        //Arrange
        var updatedAccount = JobSeekerAccountFixture.UpdatedJobSeekerAccount;
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(2);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
        await _jobSeekerAccountService.UpdateJobSeekerAccount(userId, updatedAccount)); 
    }

    [Fact]
    public async Task SaveJobShouldReturnSavedJob()
    {
        //Arrange
        int userId = 1;
        int jobId = 2;
        int jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerAccountEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepository.Setup(r => r.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ThrowsAsync(new JobSavingException("Saved job not found"));
        //Act
        var savedJob = await _jobSeekerAccountService.SaveJob(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobId, savedJob.JobId);
        Assert.Equal(jobSeekerAccountEntity.Id, savedJob.JobSeekerAccountId);
    }

    [Fact]
    public async Task SaveJobShouldThrowForbiddenExceptionIfNotCurrentUserTriesToSave()
    {
        //Arrange
        int userId = 1;
        int jobId = 1;
        int jobSeekerId = 2;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerAccountEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act & Assert 
        await Assert.ThrowsAsync<ForbiddenException>(async () =>  await _jobSeekerAccountService.SaveJob(jobId, jobSeekerId));
    }

    [Fact]
    public async Task SaveJobShouldThrowJobSavingExceptionIfJobAlreadySaved()
    {
        //Arrange
        int userId = 1;
        int jobId = 1;
        int jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerAccountEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepository.Setup(r => r.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new SavedJob());
        //Act & Assert
        await Assert.ThrowsAsync<JobSavingException>(async () =>
            await _jobSeekerAccountService.SaveJob(jobId, jobSeekerId)); 
    }
    
    [Fact]
    public async Task RemoveJobFromSavedShouldReturnSavedJob()
    {
        //Arrange
        int userId = 1;
        int jobId = 1;
        int jobSeekerId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerAccountEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepository.Setup(r => r.GetSavedJobByJobIdAndJobSeekerId(jobId, jobSeekerId))
            .ReturnsAsync(new SavedJob()
            {
                JobId = jobId,
                JobSeekerAccountId = jobSeekerId
            });
        //Act
        var savedJob = await _jobSeekerAccountService.RemoveJobFromSaved(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobId, savedJob.JobId);
        Assert.Equal(jobSeekerAccountEntity.Id, savedJob.JobSeekerAccountId);
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldThrowForbiddenExceptionIfNotCurrentUserTriesToRemove()
    {
        //Arrange
        int userId = 1;
        int jobId = 1;
        int jobSeekerId = 2;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerAccountEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobSeekerAccountService.RemoveJobFromSaved(jobId, jobSeekerId)); 
    }

}