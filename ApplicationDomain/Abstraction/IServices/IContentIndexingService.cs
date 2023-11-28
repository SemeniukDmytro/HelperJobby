using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IContentIndexingService
{
    public Task IndexJobContent(Job job);

    public Task IndexResumeContent(Resume resume);

    public Task IndexEducationContent(Education education);

    public Task IndexWorkExperienceContent(WorkExperience workExperience);

    public Task IndexSkill(Skill skill);
}