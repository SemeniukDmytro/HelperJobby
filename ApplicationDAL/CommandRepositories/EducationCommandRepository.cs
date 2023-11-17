using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class EducationCommandRepository : IEducationCommandRepository
{
    public Task<Education> Create(Education education)
    {
        throw new NotImplementedException();
    }

    public Task<Education> Update(Education education)
    {
        throw new NotImplementedException();
    }

    public Task Delete(Education education)
    {
        throw new NotImplementedException();
    }
}