using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class SkillServiceTests
{
    private readonly Mock<IJobSeekerQueryRepository> _jobSeekerAccountRepository = new();
    private readonly ISkillService _skillService;
    private readonly Mock<IUserService> _userServiceMock = new();

    public SkillServiceTests()
    {
        _skillService = new SkillService(_jobSeekerAccountRepository.Object,
            _userServiceMock.Object);
    }

    [Fact]
    public async Task CreateSkillShouldReturnEducation()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var skill = SkillFixtures.CreatedSkill;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerWithResume(userId)).ReturnsAsync(jobSeekerAccount);
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
        var userId = 1;
        var resumeId = 2;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var skill = SkillFixtures.CreatedSkill;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerWithResume(userId)).ReturnsAsync(jobSeekerAccount);
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _skillService.AddSkill(resumeId, skill));
    }

    [Fact]
    public async Task DeleteWorkExperienceShouldReturnEducationToDelete()
    {
        //Arrange
        var userId = 1;
        var skillId = 1;
        var skillEntity = SkillFixtures.SkillEntity;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act
        var skill = await _skillService.DeleteSkill(skillId);
        //Assert
        Assert.Equal(skillEntity.Id, skill.skill.Id);
    }

    [Fact]
    public async Task DeleteWorkExperienceShouldThrowForbiddenExceptionIfSkillDoesNotExist()
    {
        //Arrange
        var userId = 1;
        var skillId = 10;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _skillService.DeleteSkill(skillId));
    }
}