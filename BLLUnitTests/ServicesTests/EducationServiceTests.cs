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
    private readonly Mock<IEnqueuingTaskHelper> _enqueuingTaskHelperMock = new();
    private readonly Mock<IJobSeekerService> _jobSeekerServiceMock = new();
    private readonly Mock<IResumeQueryRepository> _resumeQueryRepositoryMock = new();

    public EducationServiceTests()
    {
        _educationService = new EducationService(_enqueuingTaskHelperMock.Object, _jobSeekerServiceMock.Object,
            _resumeQueryRepositoryMock.Object);
    }

    [Fact]
    public async Task CreateEducationShouldReturnEducation()
    {
        //Arrange
        var jobSeekerId = 1;
        var resumeId = 1;
        var resume = ResumeFixtures.ResumeEntity;
        var education = EducationFixtures.CreatedEducation;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
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
        var jobSeekerId = 1;
        var resumeId = 2;
        var jobSeekerAccount = JobSeekerFixture.JobSeekerEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var education = EducationFixtures.CreatedEducation;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _educationService.AddEducation(resumeId, education));
    }

    [Fact]
    public async Task UpdateEducationShouldReturnUpdatedEducation()
    {
        //Arrange
        var jobSeekerId = 1;
        var educationId = 1;
        var education = EducationFixtures.UpdatedEducation;
        var educationEntity = EducationFixtures.FirstEducationEntity;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var updatedEducation = await _educationService.UpdateEducation(educationId, education);
        //Assert
        Assert.Equal(updatedEducation.ResumeId, educationEntity.ResumeId);
        Assert.Equal(updatedEducation.LevelOfEducation, educationEntity.LevelOfEducation);
        Assert.Equal(updatedEducation.SchoolName, educationEntity.SchoolName);
    }

    [Fact]
    public async Task UpdateEducationShouldThrowNotFoundExceptionIfEducationIdNotFound()
    {
        //Arrange
        var jobSeekerId = 1;
        var educationId = 2;
        var education = EducationFixtures.UpdatedEducation;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<EducationNotFoundException>(async () =>
            await _educationService.UpdateEducation(educationId, education));
    }

    [Fact]
    public async Task DeleteEducationShouldReturnEducationToDelete()
    {
        //Arrange
        var jobSeekerId = 1;
        var educationId = 1;
        var educationEntity = EducationFixtures.FirstEducationEntity;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var educationToDelete = await _educationService.DeleteEducation(educationId);
        //Assert
        Assert.Equal(educationEntity.Id, educationToDelete.educationToDelete.Id);
    }

    [Fact]
    public async Task DeleteEducationShouldThrowForbiddenExceptionIfEducationDoesNotExist()
    {
        //Arrange
        var jobSeekerId = 1;
        var educationId = 12;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _educationService.DeleteEducation(educationId));
    }
}