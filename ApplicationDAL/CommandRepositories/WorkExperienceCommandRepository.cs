using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class WorkExperienceCommandRepository : IWorkExperienceCommandRepository
{
    public Task<WorkExperience> Create(WorkExperience workExperience)
    {
        throw new NotImplementedException();
    }

    public Task<WorkExperience> Update(WorkExperience workExperience)
    {
        throw new NotImplementedException();
    }

    public Task Delete(WorkExperience workExperience)
    {
        throw new NotImplementedException();
    }
}