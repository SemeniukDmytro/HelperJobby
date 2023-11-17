using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface ISkillService
{
    public Task<Skill> AddSkill(int resumeId, Skill skill);
    public Task DeleteSkill(int skillId, int userId);
}