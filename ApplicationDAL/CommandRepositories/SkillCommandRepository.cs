using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class SkillCommandRepository : ISkillCommandRepository
{
    public Task<Skill> CreateSkill(Skill skill)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSkill(Skill skill)
    {
        throw new NotImplementedException();
    }
}