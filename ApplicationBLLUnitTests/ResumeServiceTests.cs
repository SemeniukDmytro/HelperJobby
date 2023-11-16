using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using Moq;
using Xunit.Sdk;

namespace ApplicationBLLUnitTests;

public class ResumeServiceTests
{
    private readonly IResumeService _resumeService;
    private readonly Mock<ICurrentUserChecker> _currentUserCheckerMock = new();
    private readonly Mock<IResumeQueryRepository> _resumeQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();

    public ResumeServiceTests()
    {
        _resumeService = new ResumeService(_currentUserCheckerMock.Object, _resumeQueryRepositoryMock.Object,
            _jobSeekerAccountRepository.Object);
    }

    [Fact]
    public async Task CreateResumeShouldReturnCreatedResume()
    {
        //Arrange
        var userId = 1;
        var createdResume = ResumeFixtures.CreatedResume;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _currentUserCheckerMock.Setup(c => c.IsCurrentUser(userId)).Callback(() => {});
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountByUserId(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act
        var resume = await  _resumeService.CreateResume(userId, createdResume);
        //Assert
        Assert.Equal(createdResume.Educations.Count, resume.Educations.Count);
        Assert.Equal(createdResume.JobSeekerAccountId, jobSeekerAccountEntity.Id);
    }

    [Fact]
    public async Task CreateResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToCreate()
    {
        //Arrange
        var userId = 1;
        var createdResume = ResumeFixtures.CreatedResume;
        _currentUserCheckerMock.Setup(c => c.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        //Act & Assert
        await  Assert.ThrowsAsync<ForbiddenException>(async () =>  await  _resumeService.CreateResume(userId, createdResume));
    }
    

    [Fact]
    public async Task DeleteResumeShouldReturnResumeToDelete()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var resumeEntity = ResumeFixtures.ResumeEntity;
        _currentUserCheckerMock.Setup(c => c.IsCurrentUser(userId)).Callback(() => { });
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeById(resumeId)).ReturnsAsync(resumeEntity);
        //Act
        var resume = await _resumeService.DeleteResume(userId, resumeId);
        //Assert
        Assert.Equal(resumeEntity.Id, resume.Id);
    }

    [Fact]
    public async Task DeleteResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        _currentUserCheckerMock.Setup(c => c.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        //Act & Assert
        await  Assert.ThrowsAsync<ForbiddenException>(async () =>  await  _resumeService.DeleteResume(userId, resumeId));
    }
}