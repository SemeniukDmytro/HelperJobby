using ApplicationBLL.Interfaces;
using ApplicationBLL.Logic;
using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class JobSeekerAccountServiceTests
{
    private readonly JobSeekerAccountService _jobSeekerAccountService;
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerQueryRepositoryMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    private readonly Mock<ICurrentUserChecker> _currentUserCheckerMock = new();
    private readonly Mock<ISavedJobQueryRepository> _savedJobQueryRepositoryMock = new();

    public JobSeekerAccountServiceTests()
    {
        _jobSeekerAccountService =
            new JobSeekerAccountService(_jobSeekerQueryRepositoryMock.Object, _userServiceMock.Object,
                _jobQueryRepositoryMock.Object, _currentUserCheckerMock.Object, _savedJobQueryRepositoryMock.Object);
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
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntityWithSavedJobs;
        var jobEntity = JobFixtures.JobEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountWithSavedJobs(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(jobEntity);
        //Act
        var savedJob = await _jobSeekerAccountService.SaveJob(jobId, userId);
        //Assert
        Assert.Equal(jobId, savedJob.JobId);
        Assert.Equal(jobSeekerAccountEntity.Id, savedJob.JobSeekerAccountId);
    }

    [Fact]
    public async Task SaveJobShouldThrowAnJobAlreadySavedExceptionIfJobAlreadySaved()
    {
        //Arrange
        int userId = 1;
        int jobId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntityWithSavedJobs;
        var jobEntity = JobFixtures.JobEntity;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountWithSavedJobs(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(jobEntity);
        //Act & Assert 
        await Assert.ThrowsAsync<JobSavingException>(async () =>  await _jobSeekerAccountService.SaveJob(jobId, userId));
    }

    [Fact]
    public async Task SaveJobShouldThrowForbiddenExceptionIfNotCurrentUserTriesToSave()
    {
        //Arrange
        int userId = 2;
        int jobId = 1;
        _currentUserCheckerMock.Setup(c => c.IsCurrentUser(2)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobSeekerAccountService.SaveJob(jobId, 2)); 
    }
    
    [Fact]
    public async Task RemoveJobFromSavedShouldReturnSavedJob()
    {
        //Arrange
        int userId = 1;
        int jobId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntityWithSavedJobs;
        var jobEntity = JobFixtures.JobEntity;_currentUserCheckerMock.Setup(c => c.IsCurrentUser(userId)).Callback(() =>
        {
        });
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountWithSavedJobs(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _savedJobQueryRepositoryMock.Setup(r => r.GetSavedJobByJobAndUserIds(jobId, userId)).ReturnsAsync(new SavedJob()
        {
            JobId = jobId,
            JobSeekerAccountId = jobSeekerAccountEntity.Id
        });
        //Act
        var savedJob = await _jobSeekerAccountService.RemoveJobFromSaved(jobId, userId);
        //Assert
        Assert.Equal(jobId, savedJob.JobId);
        Assert.Equal(jobSeekerAccountEntity.Id, savedJob.JobSeekerAccountId);
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldThrowAnJobNotSavedIfJobIsNotSaved()
    {
        //Arrange
        int userId = 1;
        int jobId = 2;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntityWithSavedJobs;
        var jobEntity = JobFixtures.JobEntity;_currentUserCheckerMock.Setup(c => c.IsCurrentUser(userId)).Callback(() =>
        {
        });
        _jobSeekerQueryRepositoryMock.Setup(r => r.GetJobSeekerAccountWithSavedJobs(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act & Assert 
        await Assert.ThrowsAsync<JobSavingException>(async () =>  await _jobSeekerAccountService.RemoveJobFromSaved(jobId, userId));
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldThrowForbiddenExceptionIfNotCurrentUserTriesToRemove()
    {
        //Arrange
        int userId = 2;
        int jobId = 1;
        _currentUserCheckerMock.Setup(c => c.IsCurrentUser(2)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _jobSeekerAccountService.RemoveJobFromSaved(jobId, 2)); 
    }

}