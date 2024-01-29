using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface ISkillService
{
    public Task<Skill> AddSkill(int resumeId, Skill skill);
    public Task<(Skill skill, bool isResumeNeedToBeDeleted)> DeleteSkill(int skillId);

    public Task<List<Skill>> AddSkillsToResume(List<Skill> skills, int resumeId);

    public Task RemoveSkillsFromResume(int resumeId);
}