using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using Moq;

namespace ApplicationBLLUnitTests;

public class JobApplyServiceTests
{
    private readonly IJobApplyService _jobApplyService;
    private readonly Mock<IUserService> _userServiceMock = new ();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerQueryRepository = new();
    private readonly Mock<IJobQueryRepository> _jobQueryRepositoryMock = new();
    
    public JobApplyServiceTests()
    {
        _jobApplyService = new JobApplyService(_userServiceMock.Object, _jobSeekerQueryRepository.Object,
            _jobQueryRepositoryMock.Object);
    }

    [Fact]
    public async Task CreateJobApplyShouldReturnCreatedJobApply()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var job = JobFixtures.JobEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerAccountWithJobApplies(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act
        var createdJobApply = await _jobApplyService.PostJobApply(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobSeekerId, createdJobApply.JobSeekerAccountId);
        Assert.Equal(jobId, createdJobApply.JobId);
        
    }

    [Fact]
    public async Task CreateJobApplyShouldThrowForbiddenExceptionIfNotCurrentUserTriesToApply()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 2;
        var jobId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var job = JobFixtures.JobEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerAccountWithJobApplies(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync 
        <ForbiddenException>(async () => await _jobApplyService.PostJobApply(jobId, jobSeekerId));
    }
    
    [Fact]
    public async Task CreateJobApplyShouldThrowJobApplyingExceptionIfJobSeekerAlreadyApplied()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var job = JobFixtures.JobEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobQueryRepositoryMock.Setup(r => r.GetJobById(jobId)).ReturnsAsync(job);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerAccountWithJobApplies(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync 
            <JobApplyingException>(async () => await _jobApplyService.PostJobApply(jobId, jobSeekerId));
    }

    [Fact]
    public async Task DeleteJobApplyShouldReturnJobApplyToDelete()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerAccountWithJobApplies(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act
        var createdJobApply = await _jobApplyService.DeleteJobApply(jobId, jobSeekerId);
        //Assert
        Assert.Equal(jobSeekerId, createdJobApply.JobSeekerAccountId);
        Assert.Equal(jobId, createdJobApply.JobId);
    }

    [Fact]
    public async Task DeleteJobShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 2;
        var jobId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerAccountWithJobApplies(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync 
            <ForbiddenException>(async () => await _jobApplyService.DeleteJobApply(jobId, jobSeekerId));
    }
    
    [Fact]
    public async Task DeleteJobApplyShouldThrowJobApplyingExceptionIfJobSeekerHaveNotApplied()
    {
        //Arrange
        var currentUserId = 1;
        var jobSeekerId = 1;
        var jobId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(u => u.GetCurrentUserId()).Returns(currentUserId);
        _jobSeekerQueryRepository.Setup(r => r.GetJobSeekerAccountWithJobApplies(currentUserId))
            .ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync 
            <JobApplyingException>(async () => await _jobApplyService.DeleteJobApply(jobId, jobSeekerId));
    }
}