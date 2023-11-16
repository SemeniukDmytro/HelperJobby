using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.ICommandRepositories;

public interface IResumeCommandRepository
{
    public Task<Resume> CreateResume(Resume resume);
    public Task<Resume> UpdateResume(Resume resume);
    public Task DeleteResume(Resume resume);
}