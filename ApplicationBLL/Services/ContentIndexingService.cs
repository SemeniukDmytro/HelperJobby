using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ContentIndexingService : IContentIndexingService
{
    public async Task IndexJobContent(Job job)
    {
        throw new NotImplementedException();
    }

    public async Task IndexResumeContent(Resume resume)
    {
        throw new NotImplementedException();
    }

    public async Task IndexEducationContent(Education education)
    {
        throw new NotImplementedException();
    }

    public async Task IndexWorkExperienceContent(WorkExperience workExperience)
    {
        throw new NotImplementedException();
    }

    public async Task IndexSkill(Skill skill)
    {
        throw new NotImplementedException();
    }
}