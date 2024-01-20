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

        if (string.IsNullOrEmpty(skill.Name))
        {
            throw new InvalidSkillException("Provide valid name");
        }

        skill.ResumeId = resumeId;
        return skill;
    }

    public async Task<(Skill skill, bool isResumeNeedToBeDeleted)> DeleteSkill(int skillId)
    {
        var isInvalidResume = false;
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        var skillEntity = await _skillQueryRepository.GetSkillById(skillId);
        if (jobSeekerAccount.Resume.Id != skillEntity.ResumeId)
        {
            throw new ForbiddenException();
        }
        if (jobSeekerAccount.Resume.Educations.Count == 0 && jobSeekerAccount.Resume.WorkExperiences.Count == 0
                                                          && jobSeekerAccount.Resume.Skills.Count <= 1)
        {
            isInvalidResume = true;
        }
        skillEntity.Resume = jobSeekerAccount.Resume;

        return (skillEntity, isInvalidResume);
    }

    public async Task<List<Skill>> AddSkillsToResume(List<Skill> skills, int resumeId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (resumeId != jobSeekerAccount.Resume.Id)
        {
            throw new ForbiddenException("You can not add skills to other person resume");
        }
        skills.ForEach(s => s.ResumeId = resumeId);
        return skills;
    }

    public async Task RemoveSkillsFromResume(int resumeId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeekerAccount = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithResume(currentUserId);
        if (resumeId != jobSeekerAccount.Resume.Id)
        {
            throw new ForbiddenException("You can not remove skills from other person resume");
        }
    }
}