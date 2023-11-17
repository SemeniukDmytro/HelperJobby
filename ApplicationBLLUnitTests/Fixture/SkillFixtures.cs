using ApplicationDomain.Models;

namespace ApplicationBLLUnitTests.Fixture;

public static class SkillFixtures
{
    public static Skill CreatedSkill = new Skill()
    {
        Name = "Work in team"
    };

    public static Skill SkillEntity = new Skill()
    {
        Id = 1,
        Name = "Work in team",
        ResumeId = 1
    };
}