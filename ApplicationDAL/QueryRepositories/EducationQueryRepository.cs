using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.QueryRepositories;

public class EducationQueryRepository : IEducationQueryRepository
{
    public Task<Education> GetEducationById(int id)
    {
        throw new NotImplementedException();
    }
}