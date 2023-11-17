using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using Moq;

namespace ApplicationBLLUnitTests;

public class WorkExperienceServiceTests
{
    private readonly IWorkExperienceService _workExperienceService;
    private readonly Mock<ICurrentUserChecker> _currentUserCheckerMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IWorkExperienceQueryRepository> _workExperienceQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();

    public WorkExperienceServiceTests()
    {
        _workExperienceService = new WorkExperienceService(_currentUserCheckerMock.Object, _userServiceMock.Object,
            _workExperienceQueryRepositoryMock.Object, _jobSeekerAccountRepository.Object);
    }
    
    [Fact]
    public async Task CreateWorkExperienceShouldReturnEducation()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var workExperience = WorkExperienceFixtures.CreatedWorkExperience;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
        //Act
        var createdWorkExperience = await _workExperienceService.AddWorkExperience(resumeId, workExperience);
        //Assert
        Assert.Equal(createdWorkExperience.ResumeId, resume.Id);
        Assert.Equal(createdWorkExperience.JobTitle, workExperience.JobTitle);
    }
    
    [Fact]
    public async Task CreateWorkExperienceShouldThrowAnExceptionIfInvalidResumeIdProvided()
    {
        //Arrange
        var userId = 1;
        var resumeId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var workExperience = WorkExperienceFixtures.CreatedWorkExperience;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _workExperienceService.AddWorkExperience(resumeId, workExperience));
    }
    
    [Fact]
    public async Task UpdateWorkExperienceShouldReturnUpdatedEducation()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var workExperienceId = 1;
        var workExperience = WorkExperienceFixtures.UpdatedWorkExperience;
        var workExperienceEntity = WorkExperienceFixtures.WorkExperienceEntity;
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId)).ReturnsAsync(workExperienceEntity);
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(()=> {});
        //Act
        var updateWorkExperience = await _workExperienceService.UpdateWorkExperience(resumeId, userId, workExperience);
        //Assert
        Assert.Equal(updateWorkExperience.ResumeId, workExperienceEntity.ResumeId);
        Assert.Equal(updateWorkExperience.JobTitle, workExperienceEntity.JobTitle);
        Assert.Equal(updateWorkExperience.CityOrProvince, workExperienceEntity.CityOrProvince);
    }

    [Fact]
    public async Task UpdateWorkExperienceShouldForbiddenExceptionIfEducationIdIsDifferentFrom()
    {
        //Arrange
        var userId = 1;
        var resumeId = 2;
        var workExperience = WorkExperienceFixtures.UpdatedWorkExperience;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _workExperienceService.UpdateWorkExperience(resumeId, userId, workExperience));
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldReturnEducationToDelete()
    {
        //Arrange
        var userId = 1;
        var workExperienceId = 1;
        var workExperienceEntity = WorkExperienceFixtures.WorkExperienceEntity;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
            { });
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId)).ReturnsAsync(workExperienceEntity);
        //Act
        var educationToDelete = await _workExperienceService.Delete(workExperienceId, userId);
        //Assert
        Assert.Equal(workExperienceEntity.WorkExperienceId, educationToDelete.WorkExperienceId);
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var workExperienceId = 1;
        var workExperienceEntity = WorkExperienceFixtures.WorkExperienceEntity;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId)).ReturnsAsync(workExperienceEntity);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>( async () => await _workExperienceService.Delete(workExperienceId, userId));
    }
}