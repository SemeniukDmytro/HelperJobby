using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface ISkillCommandRepository
{
    public Task<Skill> CreateSkill(Skill skill);
    public Task DeleteSkill(Skill skill);
}