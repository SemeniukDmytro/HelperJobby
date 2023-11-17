using ApplicationBLL.Interfaces;
using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using Moq;

namespace ApplicationBLLUnitTests;

public class WorkExperienceServiceTests
{
    private readonly IWorkExperienceService _workExperienceService;
    private readonly Mock<ICurrentUserChecker> _currentUserCheckerMock = new();
    private readonly Mock<IUserService> _userServiceMock = new();
    private readonly Mock<IWorkExperienceQueryRepository> _workExperienceQueryRepositoryMock = new();
    private readonly Mock<IJobSeekerAccountQueryRepository> _jobSeekerAccountRepository = new();

    public WorkExperienceServiceTests()
    {
        _workExperienceService = new WorkExperienceService(_currentUserCheckerMock.Object, _userServiceMock.Object,
            _workExperienceQueryRepositoryMock.Object, _jobSeekerAccountRepository.Object);
    }
    
    [Fact]
    public async Task CreateWorkExperienceShouldReturnEducation()
    {
    }
    
    [Fact]
    public async Task CreateWorkExperienceShouldThrowAnExceptionIfInvalidResumeIdProvided()
    {
    }
    
    [Fact]
    public async Task UpdateWorkExperienceShouldReturnUpdatedEducation()
    {
    }

    [Fact]
    public async Task UpdateWorkExperienceShouldForbiddenExceptionIfEducationIdIsDifferentFrom()
    {
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldReturnEducationToDelete()
    {
    }
    
    [Fact]
    public async Task DeleteWorkExperienceShouldThrowForbiddenExceptionIfNotCurrentUserTriesToDelete()
    {
    }
}