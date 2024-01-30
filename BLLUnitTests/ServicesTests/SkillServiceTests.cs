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
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();
    private readonly Mock<ISkillQueryRepository> _skillQueryRepositoryMock = new();
    private readonly ISkillService _skillService;
    private readonly Mock<IUserService> _userServiceMock = new();

    public SkillServiceTests()
    {
        _skillService = new SkillService(_jobSeekerAccountRepository.Object, _skillQueryRepositoryMock.Object,
            _userServiceMock.Object);
    }

    [Fact]
    public async Task CreateSkillShouldReturnEducation()
    {
        //Arrange
        var userId = 1;
        var resumeId = 1;
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var skill = SkillFixtures.CreatedSkill;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
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
        var jobSeekerAccount = JobSeekerAccountFixture.JobSeekerAccountEntity;
        var resume = ResumeFixtures.ResumeEntity;
        jobSeekerAccount.Resume = resume;
        var skill = SkillFixtures.CreatedSkill;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId)).ReturnsAsync(jobSeekerAccount);
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
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _skillQueryRepositoryMock.Setup(r => r.GetSkillById(skillId)).ReturnsAsync(skillEntity);
        //Act
        var skill = await _skillService.DeleteSkill(skillId);
        //Assert
        Assert.Equal(skillEntity.Id, skill.skill.Id);
    }

    [Fact]
    public async Task DeleteWorkExperienceShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var skillId = 2;
        var jobSeekerAccountEntity = JobSeekerAccountFixture.JobSeekerAccountEntity;
        _userServiceMock.Setup(s => s.GetCurrentUserId()).Returns(userId);
        _jobSeekerAccountRepository.Setup(r => r.GetJobSeekerAccountWithResume(userId))
            .ReturnsAsync(jobSeekerAccountEntity);
        _skillQueryRepositoryMock.Setup(r => r.GetSkillById(skillId)).ReturnsAsync(new Skill
        {
            Id = skillId,
            ResumeId = 2
        });
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () => await _skillService.DeleteSkill(skillId));
    }
}