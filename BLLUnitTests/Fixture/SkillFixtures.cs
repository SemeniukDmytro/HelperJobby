using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class SkillFixtures
{
    public static Skill CreatedSkill = new Skill()
    {
        Name = "Recruiting"
    };

    public static Skill SkillEntity = new Skill()
    {
        Id = 1,
        Name = "Recruiting",
        ResumeId = 1
    };
}