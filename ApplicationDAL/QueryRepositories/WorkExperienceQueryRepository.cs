using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class WorkExperienceQueryRepository : IWorkExperienceQueryRepository
{
    public Task<WorkExperience> GetWorkExperienceById(int workExperienceId)
    {
        throw new NotImplementedException();
    }

    public Task<WorkExperience> GetWorkExperienceWithResume(int workExperienceId)
    {
        throw new NotImplementedException();
    }
}