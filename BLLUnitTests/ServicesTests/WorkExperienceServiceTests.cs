using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class WorkExperienceServiceTests
{
    private readonly IWorkExperienceService _workExperienceService;
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IWorkExperienceQueryRepository> _workExperienceQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();
    private readonly Mock<IEnqueuingTaskHelper> _enqueuingTaskHelperMock = new();


    public WorkExperienceServiceTests()
    {
        _workExperienceService = new WorkExperienceService(_userServiceMock.Object,
            _workExperienceQueryRepositoryMock.Object, _jobSeekerAccountRepository.Object, _enqueuingTaskHelperMock.Object);
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
        var workExperienceId = 1;
        var workExperience = WorkExperienceFixtures.UpdatedWorkExperience;
        var workExperienceEntity = WorkExperienceFixtures.FirstWorkExperienceEntity;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId))
            .ReturnsAsync(workExperienceEntity);
        //Act
        var updateWorkExperience = await _workExperienceService.UpdateWorkExperience(workExperienceId, workExperience);
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
        var workExperienceId = 2;
        var workExperience = WorkExperienceFixtures.UpdatedWorkExperience;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var workExperienceEntity = WorkExperienceFixtures.SecondWorkExperienceEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId))
            .ReturnsAsync(workExperienceEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _workExperienceService.UpdateWorkExperience(workExperienceId, workExperience));
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldReturnEducationToDelete()
    {
        //Arrange
        var userId = 1;
        var workExperienceId = 1;
        var workExperienceEntity = WorkExperienceFixtures.FirstWorkExperienceEntity;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId)).ReturnsAsync(workExperienceEntity);
        //Act
        var educationToDelete = await _workExperienceService.Delete(workExperienceId);
        //Assert
        Assert.Equal(workExperienceEntity.WorkExperienceId, educationToDelete.workExperience.WorkExperienceId);
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var workExperienceId = 1;
        var workExperienceEntity = WorkExperienceFixtures.SecondWorkExperienceEntity;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _workExperienceQueryRepositoryMock.Setup(r => r.GetWorkExperienceById(workExperienceId)).ReturnsAsync(workExperienceEntity);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>( async () => await _workExperienceService.Delete(workExperienceId));
    }
}