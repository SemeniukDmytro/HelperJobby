using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class SkillCommandRepository : ISkillCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public SkillCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Skill> CreateSkill(Skill skill)
    {
        _applicationContext.Skills.Add(skill);
        await _applicationContext.SaveChangesAsync();
        return skill;
    }

    public async Task DeleteSkill(Skill skill)
    {
        _applicationContext.Skills.Remove(skill);
        await _applicationContext.SaveChangesAsync();
    }
}