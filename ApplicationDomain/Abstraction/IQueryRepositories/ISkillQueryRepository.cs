using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IQueryRepositories;

public interface ISkillQueryRepository
{
    public Task<Skill> GetSkillById(int skillId);
    public Task<Skill> GetSkillWithResume(int skillId);
}