using ApplicationDAL.Context;
using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class EducationCommandRepository : IEducationCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public EducationCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Education> Create(Education education)
    {
        _applicationContext.Educations.Add(education);
        await _applicationContext.SaveChangesAsync();
        return education;
    }

    public async Task<Education> Update(Education education)
    {
        _applicationContext.Educations.Update(education);
        await _applicationContext.SaveChangesAsync();
        return education;
    }

    public async Task Delete(Education education)
    {
        _applicationContext.Educations.Remove(education);
        await _applicationContext.SaveChangesAsync();
    }
}