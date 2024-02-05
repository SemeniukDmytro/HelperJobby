using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class SkillService : ISkillService
{
    private readonly IJobSeekerQueryRepository _jobSeekerQueryRepository;
    private readonly IUserService _userService;

    public SkillService(IJobSeekerQueryRepository jobSeekerQueryRepository,
        IUserService userService)
    {
        _jobSeekerQueryRepository = jobSeekerQueryRepository;
        _userService = userService;
    }

    public async Task<Skill> AddSkill(int resumeId, Skill skill)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume.Id != resumeId)
            throw new ForbiddenException("You can not add skill to this resume");

        if (string.IsNullOrEmpty(skill.Name)) throw new InvalidSkillException("Provide valid name");

        skill.ResumeId = resumeId;
        return skill;
    }

    public async Task<(Skill skill, bool isResumeNeedToBeDeleted)> DeleteSkill(int skillId)
    {
        var isInvalidResume = false;
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (jobSeeker.Resume == null) throw new ResumeNotFoundException();
        var skillEntity = jobSeeker.Resume.Skills.FirstOrDefault(s => s.Id == skillId);
        if (skillEntity == null) throw new ForbiddenException();
        if (jobSeeker.Resume.Educations.Count == 0 && jobSeeker.Resume.WorkExperiences.Count == 0
                                                          && jobSeeker.Resume.Skills.Count <= 1)
            isInvalidResume = true;
        skillEntity.Resume = jobSeeker.Resume;

        return (skillEntity, isInvalidResume);
    }

    public async Task<List<Skill>> AddSkillsToResume(List<Skill> skills, int resumeId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (resumeId != jobSeeker.Resume.Id)
            throw new ForbiddenException("You can not add skills to other person resume");
        skills.ForEach(s => s.ResumeId = resumeId);
        return skills;
    }

    public async Task RemoveSkillsFromResume(int resumeId)
    {
        var currentUserId = _userService.GetCurrentUserId();
        var jobSeeker = await _jobSeekerQueryRepository.GetJobSeekerWithResume(currentUserId);
        if (resumeId != jobSeeker.Resume.Id)
            throw new ForbiddenException("You can not remove skills from other person resume");
    }
}