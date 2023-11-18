using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationBLLUnitTests.Fixture;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using Moq;

namespace ApplicationBLLUnitTests;

public class SkillServiceTests
{
    private readonly ISkillService _skillService;
    private readonly Mock<ICurrentUserChecker> _currentUserCheckerMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<ISkillQueryRepository> _skillQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();

    public SkillServiceTests()
    {
        _skillService = new SkillService(_jobSeekerAccountRepository.Object, _skillQueryRepositoryMock.Object,
            _userServiceMock.Object, _currentUserCheckerMock.Object);
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
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
            { });
        _skillQueryRepositoryMock.Setup(r => r.GetSkillById(skillId)).ReturnsAsync(skillEntity);
        //Act
        var skill = await _skillService.DeleteSkill(skillId, userId);
        //Assert
        Assert.Equal(skillEntity.Id, skill.Id);
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
        //Arrange
        var userId = 1;
        var skillId = 1;
        var skillEntity = SkillFixtures.SkillEntity;
        _currentUserCheckerMock.Setup(us => us.IsCurrentUser(userId)).Callback(() =>
        {
            throw new ForbiddenException();
        });
        _skillQueryRepositoryMock.Setup(r => r.GetSkillById(skillId)).ReturnsAsync(skillEntity);
        //Act % Assert
        await Assert.ThrowsAsync<ForbiddenException>( async () => await _skillService.DeleteSkill(skillId, userId));
    }
}