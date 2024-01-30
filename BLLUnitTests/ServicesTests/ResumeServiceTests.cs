using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class ResumeServiceTests
{
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();
    private readonly IResumeService _resumeService;
    private readonly Mock<IUserService> _userServiceMock = new();

    public ResumeServiceTests()
    {
        _resumeService = new ResumeService(_userServiceMock.Object,
            _jobSeekerAccountRepository.Object);
    }

    [Fact]
    public async Task CreateResumeShouldReturnCreatedResume()
    {
        //Arrange
        var userId = 1;
        var createdResume = ResumeFixtures.CreatedResume;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.SecondJobSeekerAccountEntity;
        _userServiceMock.Setup(c => c.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act
        var resume = await _resumeService.CreateResume(createdResume);
        //Assert
        Assert.Equal(createdResume.Educations.Count, resume.Educations.Count);
        Assert.Equal(createdResume.JobSeekerAccountId, jobSeekerAccountEntity.Id);
    }

    [Fact]
    public async Task CreateResumeShouldThrowForbiddenExceptionIfCurrentUserAlreadyHasResume()
    {
        //Arrange
        var userId = 1;
        var createdResume = ResumeFixtures.CreatedResume;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(c => c.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _resumeService.CreateResume(createdResume));
    }

    [Fact]
    public async Task DeleteResumeShouldReturnResumeToDelete()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(c => c.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act
        var resume = await _resumeService.DeleteResume(resumeId);
        //Assert
        Assert.Equal(resumeId, resume.Id);
    }

    [Fact]
    public async Task DeleteResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var resumeId = 2;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(c => c.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _resumeService.DeleteResume(resumeId));
    }
}