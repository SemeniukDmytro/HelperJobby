using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IResumeCommandRepository
{
    public Task<Resume> CreateResume(Resume resume);
    public Task DeleteResume(Resume resume);
}