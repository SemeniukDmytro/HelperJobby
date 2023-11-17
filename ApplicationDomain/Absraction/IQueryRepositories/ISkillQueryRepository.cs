using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface ISkillQueryRepository
{
    public Task<Skill> GetSkillById(int skillId);
    public Task<Skill> GetSkillWithResume(int resumeId);
}