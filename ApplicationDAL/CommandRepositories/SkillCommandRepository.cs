using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.ICommandRepositories;
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

    public async Task<IEnumerable<Skill>> AddSkillsToResume(List<Skill> skills)
    {
        _applicationContext.Skills.AddRange(skills);
        await _applicationContext.SaveChangesAsync();
        return skills;
    }

    public async Task RemoveResumeSkills(int resumeId)
    {
        var skillsToRemove = _applicationContext.Skills.Where(s => s.ResumeId == resumeId);
         _applicationContext.Skills.RemoveRange(skillsToRemove);
         await _applicationContext.SaveChangesAsync();
    }
}