using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class SkillQueryRepository : ISkillQueryRepository
{
    public Task<Skill> GetSkillById(int skillId)
    {
        throw new NotImplementedException();
    }

    public Task<Skill> GetSkillWithResume(int resumeId)
    {
        throw new NotImplementedException();
    }
}