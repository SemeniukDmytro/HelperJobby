using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class SkillServiceTests
{
    private readonly Mock<IJobSeekerService> _jobSeekerServiceMock = new();
    private readonly Mock<IResumeQueryRepository> _resumeQueryRepositoryMock = new();
    private readonly ISkillService _skillService;

    public SkillServiceTests()
    {
        _skillService = new SkillService(_resumeQueryRepositoryMock.Object,
            _jobSeekerServiceMock.Object);
    }

    [Fact]
    public async Task CreateSkillShouldReturnEducation()
    {
        //Arrange
        var jobSeekerId = 1;
        var resumeId = 1;
        var jobSeekerAccount = JobSeekerFixture.JobSeekerEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var skill = SkillFixtures.CreatedSkill;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var createSkill = await _skillService.AddSkill(resumeId, skill);
        //Assert
        Assert.Equal(createSkill.ResumeId, resume.Id);
        Assert.Equal(createSkill.Name, skill.Name);
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
        var skill = SkillFixtures.CreatedSkill;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _skillService.AddSkill(resumeId, skill));
    }

    [Fact]
    public async Task DeleteWorkExperienceShouldReturnEducationToDelete()
    {
        //Arrange
        var jobSeekerId = 1;
        var skillId = 1;
        var skillEntity = SkillFixtures.SkillEntity;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act
        var skill = await _skillService.DeleteSkill(skillId);
        //Assert
        Assert.Equal(skillEntity.Id, skill.skill.Id);
    }

    [Fact]
    public async Task DeleteSkillShouldThrowNotFoundExceptionIfSkillDoesNotExist()
    {
        //Arrange
        var jobSeekerId = 1;
        var skillId = 10;
        var resume = ResumeFixtures.ResumeEntity;
        _jobSeekerServiceMock.Setup(us => us.GetCurrentJobSeekerId()).Returns(jobSeekerId);
        _resumeQueryRepositoryMock.Setup(r => r.GetResumeByJobSeekerId(jobSeekerId))
            .ReturnsAsync(resume);
        //Act % Assert
        await Assert.ThrowsAsync<SkillNotFoundException>(async () => await _skillService.DeleteSkill(skillId));
    }
}