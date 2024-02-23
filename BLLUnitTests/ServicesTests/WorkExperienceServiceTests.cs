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
    private readonly Mock<IEnqueuingTaskHelper> _enqueuingTaskHelperMock = new();
    private readonly Mock<IJobSeekerService> _jobSeekerServiceMock = new();
    private readonly Mock<IResumeQueryRepository> _resumeQueryRepositoryMock = new();


    public WorkExperienceServiceTests()
    {
        _workExperienceService = new WorkExperienceService(_enqueuingTaskHelperMock.Object, _resumeQueryRepositoryMock.Object,
            _jobSeekerServiceMock.Object);
    }

    [Fact]
    public async Task CreateWorkExperienceShouldReturnEducation()
    {
        //Arrange
        var jobSeekerId = 1;
        var resumeId = 1;
        var jobSeekerAccount = JobSeekerFixture.JobSeekerEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var workExperience = WorkExperienceFixtures.CreatedWorkExperience;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
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
        var jobSeekerId = 1;
        var resumeId = 2;
        var jobSeekerAccount = JobSeekerFixture.JobSeekerEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var workExperience = WorkExperienceFixtures.CreatedWorkExperience;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _workExperienceService.AddWorkExperience(resumeId, workExperience));
    }

    [Fact]
    public async Task UpdateWorkExperienceShouldReturnUpdatedEducation()
    {
        //Arrange
        var jobSeekerId = 1;
        var workExperienceId = 1;
        var workExperience = WorkExperienceFixtures.UpdatedWorkExperience;
        var workExperienceEntity = WorkExperienceFixtures.FirstWorkExperienceEntity;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var updateWorkExperience = await _workExperienceService.UpdateWorkExperience(workExperienceId, workExperience);
        //Assert
        Assert.Equal(updateWorkExperience.ResumeId, workExperienceEntity.ResumeId);
        Assert.Equal(updateWorkExperience.JobTitle, workExperienceEntity.JobTitle);
        Assert.Equal(updateWorkExperience.CityOrProvince, workExperienceEntity.CityOrProvince);
    }

    [Fact]
    public async Task UpdateWorkExperienceShouldThrowNotFoundExceptionIfWorkExperienceNotFound()
    {
        //Arrange
        var jobSeekerId = 1;
        var workExperienceId = 2;
        var workExperience = WorkExperienceFixtures.UpdatedWorkExperience;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<WorkExperienceNotFoundException>(async () =>
            await _workExperienceService.UpdateWorkExperience(workExperienceId, workExperience));
    }

    [Fact]
    public async Task DeleteWorkExperienceShouldReturnEducationToDelete()
    {
        //Arrange
        var jobSeekerId = 1;
        var workExperienceId = 1;
        var workExperienceEntity = WorkExperienceFixtures.FirstWorkExperienceEntity;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var educationToDelete = await _workExperienceService.DeleteWorkExperience(workExperienceId);
        //Assert
        Assert.Equal(workExperienceEntity.Id, educationToDelete.workExperience.Id);
    }

    [Fact]
    public async Task DeleteWorkExperienceShouldThrowNotFoundExceptionIfWorkExperienceNotFound()
    {
        //Arrange
        var jobSeekerId = 1;
        var workExperienceId = 10;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act % Assert
        await Assert.ThrowsAsync<WorkExperienceNotFoundException>(async () => await _workExperienceService.DeleteWorkExperience(workExperienceId));
    }
}