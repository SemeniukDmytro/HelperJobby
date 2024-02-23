using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class ResumeServiceTests
{
    private readonly IResumeService _resumeService;
    private readonly Mock<IJobSeekerService> _jobSeekerServiceMock = new();
    private readonly Mock<IResumeQueryRepository> _resumeQueryRepositoryMock = new();

    public ResumeServiceTests()
    {
        _resumeService = new ResumeService(_resumeQueryRepositoryMock.Object,
            _jobSeekerServiceMock.Object);
    }

    [Fact]
    public async Task CreateResumeShouldReturnCreatedResume()
    {
        //Arrange
        var jobSeekerId = 2;
        var createdResume = ResumeFixtures.CreatedResume;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ThrowsAsync(new ResumeNotFoundException());
        //Act
        var retrievedResume = await _resumeService.CreateResume(createdResume);
        //Assert
        Assert.Equal(createdResume.Educations.Count, retrievedResume.Educations.Count);
        Assert.Equal(createdResume.JobSeekerId, jobSeekerId);
    }

    [Fact]
    public async Task CreateResumeShouldThrowForbiddenExceptionIfCurrentUserAlreadyHasResume()
    {
        //Arrange
        var jobSeekerId = 1;
        var createdResume = ResumeFixtures.CreatedResume;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _resumeService.CreateResume(createdResume));
    }

    [Fact]
    public async Task DeleteResumeShouldReturnResumeToDelete()
    {
        //Arrange
        var jobSeekerId = 1;
        var resumeId = 1;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var retrievedResume = await _resumeService.DeleteResume(resumeId);
        //Assert
        Assert.Equal(resumeId, retrievedResume.Id);
    }

    [Fact]
    public async Task DeleteResumeShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var jobSeekerId = 1;
        var resumeId = 2;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _resumeService.DeleteResume(resumeId));
    }
}