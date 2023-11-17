using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface ISkillCommandRepository
{
    public Task<Skill> CreateSkill(Skill skill);
    public Task DeleteSkill(Skill skill);
}