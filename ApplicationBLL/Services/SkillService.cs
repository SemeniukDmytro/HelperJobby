using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class SkillService : ISkillService
{
    private readonly IResumeQueryRepository _resumeQueryRepository;
    private readonly IJobSeekerService _jobSeekerService;
    public SkillService(IResumeQueryRepository resumeQueryRepository, IJobSeekerService jobSeekerService)
    {
        _resumeQueryRepository = resumeQueryRepository;
        _jobSeekerService = jobSeekerService;
    }

    public async Task<Skill> AddSkill(int resumeId, Skill skill)
    {
        if (string.IsNullOrEmpty(skill.Name)) throw new InvalidSkillException("Provide valid name");
        
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        if (resume.Id != resumeId)
            throw new ForbiddenException("You can not add skill to this resume");

        skill.ResumeId = resumeId;
        return skill;
    }

    public async Task<(Skill skill, bool isResumeNeedToBeDeleted)> DeleteSkill(int skillId)
    {
        var isInvalidResume = false;
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        
        var skillEntity = resume.Skills.FirstOrDefault(s => s.Id == skillId);
        if (skillEntity == null) throw new SkillNotFoundException();
        if (resume.Educations.Count == 0 && resume.WorkExperiences.Count == 0
                                         && resume.Skills.Count <= 1)
        {
            isInvalidResume = true;
        }
        
        skillEntity.Resume = resume;

        return (skillEntity, isInvalidResume);
    }

    public async Task<List<Skill>> AddSkillsToResume(List<Skill> skills, int resumeId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        if (resumeId != resume.Id)
            throw new ForbiddenException("You can not add skills to other person resume");
        skills.ForEach(s => s.ResumeId = resumeId);
        return skills;
    }

    public async Task<List<Skill>> RemoveSkillsFromResume(int resumeId)
    {
        var currentJobSeekerId = _jobSeekerService.GetCurrentJobSeekerId();
        var resume = await _resumeQueryRepository.GetResumeByJobSeekerId(currentJobSeekerId);
        if (resumeId != resume.Id)
            throw new ForbiddenException("You can not remove skills from other person resume");
        return resume.Skills;
    }
}