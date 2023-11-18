using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class SkillService : ISkillService
{
    private readonly ICurrentUserChecker _currentUserChecker;
    private readonly IUserService _userService;
    private readonly ISkillQueryRepository _skillQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;

    public SkillService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, ISkillQueryRepository skillQueryRepository,
        IUserService userService, ICurrentUserChecker currentUserChecker)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _skillQueryRepository = skillQueryRepository;
        _userService = userService;
        _currentUserChecker = currentUserChecker;
    }

    public async Task<Skill> AddSkill(int resumeId, Skill skill)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume.Id != resumeId)
        {
            throw new ForbiddenException();
        }

        skill.ResumeId = resumeId;
        return skill;
    }

    public async Task<Skill> DeleteSkill(int skillId, int userId)
    {
        _currentUserChecker.IsCurrentUser(userId);
        var skillEntity = await _skillQueryRepository.GetSkillById(skillId);
        return skillEntity;
    }
}