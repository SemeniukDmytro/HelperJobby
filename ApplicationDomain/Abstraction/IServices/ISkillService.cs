using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface ISkillService
{
    public Task<Skill> AddSkill(int resumeId, Skill skill);
    public Task<(Skill skill, bool isResumeNeedToBeDeleted)> DeleteSkill(int skillId);
}