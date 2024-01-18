using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.BackgroundInterfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class EducationServiceTests
{
    private readonly IEducationService _educationService;
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IEducationQueryRepository> _educationQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountQueryRepository = new();
    private readonly Mock<IEnqueuingTaskHelper> _enqueuingTaskHelperMock = new();

    public EducationServiceTests()
    {
        _educationService = new EducationService(_educationQueryRepositoryMock.Object,
            _jobSeekerAccountQueryRepository.Object, _userServiceMock.Object, _enqueuingTaskHelperMock.Object);
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
        _jobSeekerAccountQueryRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
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
        _jobSeekerAccountQueryRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _educationService.AddEducation(resumeId, education));
    }
    
    [Fact]
    public async Task UpdateEducationShouldReturnUpdatedEducation()
    {
        //Arrange
        var userId = 1;
        var educationId = 1;
        var education = EducationFixtures.UpdatedEducation;
        var educationEntity = EducationFixtures.FirstEducationEntity;
        var jobSeekerWithResume = JobSeekerAccountFixture.JobSeekerAccountEntity;
        jobSeekerWithResume.Resume = ResumeFixtures.ResumeEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountQueryRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerWithResume);
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        //Act
        var updatedEducation = await _educationService.UpdateEducation(educationId, education);
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
        var educationId = 2;
        var education = EducationFixtures.UpdatedEducation;
        var jobSeekerWithResume = JobSeekerAccountFixture.JobSeekerAccountEntity;
        jobSeekerWithResume.Resume = ResumeFixtures.ResumeEntity;
        var educationEntity = EducationFixtures.SecondEducationEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountQueryRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerWithResume);
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _educationService.UpdateEducation(educationId, education));
    }
    
    [Fact]
    public async Task DeleteEducationShouldReturnEducationToDelete()
    {
        //Arrange
        var userId = 1;
        var educationId = 1;
        var educationEntity = EducationFixtures.FirstEducationEntity;
        var jobSeekerWithResume = JobSeekerAccountFixture.JobSeekerAccountEntity;
        jobSeekerWithResume.Resume = ResumeFixtures.ResumeEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountQueryRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerWithResume);
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        //Act
        var educationToDelete = await _educationService.Delete(educationId);
        //Assert
        Assert.Equal(educationEntity.Id, educationToDelete.educationToDelete.Id);
    }
    
    [Fact]
    public async Task DeleteEducationShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var educationId = 1;
        var educationEntity = EducationFixtures.SecondEducationEntity;
        var jobSeekerWithResume = JobSeekerAccountFixture.JobSeekerAccountEntity;
        jobSeekerWithResume.Resume = ResumeFixtures.ResumeEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountQueryRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerWithResume);
        _educationQueryRepositoryMock.Setup(r => r.GetEducationById(educationId)).ReturnsAsync(educationEntity);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>( async () => await _educationService.Delete(educationId));
    }
}