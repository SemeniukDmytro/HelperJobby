using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ResumeService : IResumeService
{
    public Task<Resume> CreateResume(int userId, Resume resume)
    {
        throw new NotImplementedException();
    }

    public Task<Resume> UpdateResume(int userId, int resumeId, Resume resume)
    {
        throw new NotImplementedException();
    }

    public Task<Resume> DeleteResume(int userId, int resumeId)
    {
        throw new NotImplementedException();
    }
}