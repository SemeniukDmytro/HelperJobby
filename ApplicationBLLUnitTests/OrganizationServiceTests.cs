using ApplicationBLL.Services;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Moq;

namespace ApplicationBLLUnitTests;

public class OrganizationServiceTests
{
    private OrganizationService _organizationService;
    private Mock<IUserQueryRepository> _userQueryRepositoryMock = new();
    private Mock<IUserService> _userServiceMock = new();

    public OrganizationServiceTests()
    {
        _organizationService = new OrganizationService(_userServiceMock.Object, _userQueryRepositoryMock.Object);
    }
    
}