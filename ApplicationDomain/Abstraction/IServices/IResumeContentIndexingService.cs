using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IResumeContentIndexingService
{
    public Task IndexResumeContent(Resume resume);

    public Task IndexEducationContent(Education education);

    public  Task UpdateIndexedEducationContent(Education education);
    public Task DeleteIndexedEducationContent(Education education);

    public Task IndexWorkExperienceContent(WorkExperience workExperience);

    public Task IndexSkill(Skill skill);
}