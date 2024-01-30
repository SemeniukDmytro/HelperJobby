using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class SkillQueryRepository : ISkillQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public SkillQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Skill> GetSkillById(int skillId)
    {
        return await GetSkill(skillId);
    }

    public async Task<Skill> GetSkillWithResume(int skillId)
    {
        return await GetSkill(skillId, q => q.Include(s => s.Resume));
    }

    private async Task<Skill> GetSkill(int skillId, Func<IQueryable<Skill>, IQueryable<Skill>> includeFunc = null)
    {
        var query = _applicationContext.Skills.AsQueryable();
        if (includeFunc != null) query = includeFunc(query);

        var skill = await query.FirstOrDefaultAsync(e => e.Id == skillId);
        if (skill == null) throw new SkillNotFoundException();
        return skill;
    }
}