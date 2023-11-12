using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class CurrentJobCreationServiceTests
{
    private readonly CurrentJobCreationService _currentJobCreationService;
    private readonly Mock<IUserService> _userServiceMock = new ();
    private readonly Mock<IEmployerAccountQueryRepository> _employerAccountQueryRepositoryMock = new();

    public CurrentJobCreationServiceTests()
    {
        _currentJobCreationService = new CurrentJobCreationService(_userServiceMock.Object, _employerAccountQueryRepositoryMock.Object);
    }
    

    [Fact]
    public async Task StartJobCreationShouldReturnCreatedCurrentJob()
    {
        //Arrange
        var newJob = new CurrentJobCreation()
        {
            JobTitle = "new Job",
            NumberOfOpenings = 4,
            Language = "English",
            Location = "random street, random city"
        };
        var userId = 1;
        _userServiceMock.Setup(us => us.GetCurrentUserId()).Returns(userId);
        //Act

        //Assert

    }
}