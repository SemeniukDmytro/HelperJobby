using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class ResumeCommandRepository : IResumeCommandRepository
{
    public Task<Resume> CreateResume(Resume resume)
    {
        throw new NotImplementedException();
    }

    public Task<Resume> UpdateResume(Resume resume)
    {
        throw new NotImplementedException();
    }

    public Task DeleteResume(Resume resume)
    {
        throw new NotImplementedException();
    }
}