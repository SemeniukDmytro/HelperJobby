using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using Moq;

namespace ApplicationBLLUnitTests;

public class JobSeekerAccountServiceTests
{
    private readonly JobSeekerAccountService _jobSeekerAccountService;
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerQueryRepositoryMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();

    public JobSeekerAccountServiceTests()
    {
        _jobSeekerAccountService =
            new JobSeekerAccountService(_jobSeekerQueryRepositoryMock.Object, _userServiceMock.Object);
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldReturnUpdatedJobSeekerAccount()
    {
        
    }

    [Fact]
    public async Task UpdateJobSeekerAccountShouldThrowForbiddenExceptionIfNotCurrentUserTriesToUpdate()
    {
        
    }

    [Fact]
    public async Task SaveJobShouldReturnSavedJob()
    {
        
    }

    [Fact]
    public async Task SaveJobShouldThrowAnJobAlreadySavedExceptionIfJobAlreadySaved()
    {
        
    }

    [Fact]
    public async Task SaveJobShouldThrowForbiddenExceptionIfNotCurrentUserTriesToSave()
    {
        
    }

    [Fact]
    public async Task SaveJobShouldThrowJobDoesNotExistIfJobDoesNotExist()
    {
        
    }
    
    [Fact]
    public async Task RemoveJobFromSavedShouldReturnSavedJob()
    {
        
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldThrowAnJobAlreadyNotSavedIfJobIsNotSaved()
    {
        
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldThrowForbiddenExceptionIfNotCurrentUserTriesToRemove()
    {
        
    }

    [Fact]
    public async Task RemoveJobFromSavedShouldThrowJobDoesNotExistIfJobDoesNotExist()
    {
        
    }
}