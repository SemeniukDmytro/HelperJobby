using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class SkillService : ISkillService
{
    public Task<Skill> AddSkill(int resumeId, Skill skill)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSkill(int skillId, int userId)
    {
        throw new NotImplementedException();
    }
}