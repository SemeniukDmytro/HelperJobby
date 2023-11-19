using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class SkillService : ISkillService
{
    private readonly IUserService _userService;
    private readonly ISkillQueryRepository _skillQueryRepository;
    private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;

    public SkillService(IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, ISkillQueryRepository skillQueryRepository,
        IUserService userService)
    {
        _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
        _skillQueryRepository = skillQueryRepository;
        _userService = userService;
    }

    public async Task<Skill> AddSkill(int resumeId, Skill skill)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (jobSeekerAccount.Resume.Id != resumeId)
        {
            throw new ForbiddenException("You can not add skill to this resume");
        }

        skill.ResumeId = resumeId;
        return skill;
    }

    public async Task<Skill> DeleteSkill(int skillId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        var skillEntity = await _skillQueryRepository.GetSkillById(skillId);
        if (jobSeekerAccount.Resume.Id != skillEntity.ResumeId)
        {
            throw new ForbiddenException();
        }
        return skillEntity;
    }
}