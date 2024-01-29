using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface ISkillCommandRepository
{
    public Task<Skill> CreateSkill(Skill skill);
    public Task DeleteSkill(Skill skill);
    public Task<IEnumerable<Skill>> AddSkillsToResume(List<Skill> skills);
    public Task RemoveResumeSkills(int resumeId);
}