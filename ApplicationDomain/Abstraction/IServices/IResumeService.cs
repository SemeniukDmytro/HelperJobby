using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IResumeService
{
    public Task<Resume> CreateResume(Resume resume);
    public Task<Resume> DeleteResume(int resumeId);
}