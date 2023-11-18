using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using Moq;
using Xunit.Sdk;

namespace ApplicationBLLUnitTests;

public class EducationServiceTests
{
    private readonly IEducationService _educationService;
    private readonly Mock<ICurrentUserChecker> _currentUserCheckerMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IEducationQueryRepository> _educationQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();

    public EducationServiceTests()
    {
        _educationService = new EducationService(_currentUserCheckerMock.Object, _educationQueryRepositoryMock.Object,
            _jobSeekerAccountRepository.Object, _userServiceMock.Object);
    }

    [Fact]
    public async Task CreateEducationShouldReturnEducation()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var education = EducationFixtures.CreatedEducation;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
        //Act
        var createdEducation = await _educationService.AddEducation(resumeId, education);
        //Assert
        Assert.Equal(createdEducation.ResumeId, resume.Id);
        Assert.Equal(createdEducation.LevelOfEducation, education.LevelOfEducation);
    }
    
    [Fact]
    public async Task CreateEducationShouldThrowAnExceptionIfInvalidResumeIdProvided()
    {
        //Arrange
        var userId = 1;
        var resumeId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var education = EducationFixtures.CreatedEducation;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _educationService.AddEducation(resumeId, education));
    }
    
    [Fact]
    public async Task UpdateEducationShouldReturnUpdatedEducation()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var educationId = 1;
        var education = EducationFixtures.UpdatedEducation;
        var educationEntity = EducationFixtures.EducationEntity;
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(()=> {});
        //Act
        var updatedEducation = await _educationService.UpdateEducation(resumeId, userId, education);
        //Assert
        Assert.Equal(updatedEducation.ResumeId, educationEntity.ResumeId);
        Assert.Equal(updatedEducation.LevelOfEducation, educationEntity.LevelOfEducation);
        Assert.Equal(updatedEducation.SchoolName, educationEntity.SchoolName);
    }

    [Fact]
    public async Task UpdateEducationShouldForbiddenExceptionIfEducationIdIsDifferentFrom()
    {
        //Arrange
        var userId = 1;
        var resumeId = 2;
        var education = EducationFixtures.UpdatedEducation;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _educationService.UpdateEducation(resumeId, userId, education));
    }
    
    [Fact]
    public async Task DeleteEducationShouldReturnEducationToDelete()
    {
        //Arrange
        var userId = 1;
        var educationId = 1;
        var educationEntity = EducationFixtures.EducationEntity;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
        { });
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        //Act
        var educationToDelete = await _educationService.Delete(educationId, userId);
        //Assert
        Assert.Equal(educationEntity.Id, educationToDelete.Id);
    }
    
    [Fact]
    public async Task DeleteEducationShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var educationId = 1;
        var educationEntity = EducationFixtures.EducationEntity;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>( async () => await _educationService.Delete(educationId, userId));
    }
}