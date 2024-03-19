using ApplicationBLL.Services;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using BLLUnitTests.Fixture;
using Moq;

namespace BLLUnitTests.ServicesTests;

public class IncompleteJobServiceTests
{
    private readonly Mock<IEmployerService> _employerServiceMock = new();
    private readonly Mock<IIncompleteJobQueryRepository> _incompleteJobQueryRepository = new();
    private readonly IncompleteJobService _incompleteJobService;

    public IncompleteJobServiceTests()
    {
        _incompleteJobService =
            new IncompleteJobService(_incompleteJobQueryRepository.Object, _employerServiceMock.Object);
    }


    [Fact]
    public async Task StartJobCreationShouldReturnCreatedCurrentJob()
    {
        //Arrange
        var newJob = new IncompleteJob
        {
            JobTitle = "new Job",
            NumberOfOpenings = 4,
            Language = "English",
            Location = "random street, random city"
        };
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        //Act
        var job = await _incompleteJobService.StartIncompleteJobCreation(newJob);
        //Assert
        Assert.Equal(newJob.NumberOfOpenings, job.NumberOfOpenings);
        Assert.Equal(employerId, job.EmployerId);
    }


    [Fact]
    public async Task UpdateJobCreationShouldReturnUpdatedCurrentJob()
    {
        //Arrange
        var newJob = new IncompleteJob
        {
            JobTypes = default,
            Salary = new IncompleteJobSalary
            {
                MinimalAmount = 256,
                SalaryRate = SalaryRates.PerDay
            },
            Benefits = (EmployeeBenefits)3
        };
        var jobId = 1;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _incompleteJobQueryRepository.Setup(r => r.GetIncompleteJobById(jobId))
            .ReturnsAsync(new IncompleteJob
            {
                Id = jobId,
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city",
                EmployerId = employerId,
                Employer = EmployerFixtures.EmployerEntity
            });
        //Act
        var job = await _incompleteJobService.UpdateIncompleteJob(jobId, newJob);
        //Assert
        Assert.Equal("new Job", job.JobTitle);
        Assert.Equal(newJob.Salary.MinimalAmount, job.Salary.MinimalAmount);
        Assert.Equal(employerId, job.EmployerId);
        Assert.Equal(jobId, job.Id);
    }

    [Fact]
    public async Task UpdateJobCreationShouldThrowForbiddenExceptionIfNotCurrentEmployerTriesToUpdate()
    {
        //Arrange
        var newJob = new IncompleteJob
        {
            Benefits = (EmployeeBenefits)3
        };
        var jobId = 1;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _incompleteJobQueryRepository.Setup(r => r.GetIncompleteJobById(jobId))
            .ReturnsAsync(new IncompleteJob
            {
                Id = jobId,
                JobTitle = "new Job",
                NumberOfOpenings = 4,
                Language = "English",
                Location = "random street, random city",
                EmployerId = 2,
                Employer = EmployerFixtures.SecondEmployerEntity
            });
        //Act & Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _incompleteJobService.UpdateIncompleteJob(jobId, newJob));
    }

    [Fact]
    public async Task DeleteJobShouldReturnJobToDelete()
    {
        //Arrange
        var jobId = 1;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _incompleteJobQueryRepository.Setup(r => r.GetIncompleteJobById(jobId)).ReturnsAsync(
            new IncompleteJob
            {
                Id = jobId,
                JobTitle = "Test",
                EmployerId = 1,
                Employer = EmployerFixtures.EmployerEntity
            });

        //Act
        var job = await _incompleteJobService.DeleteIncompleteJob(jobId);
        //Assert
        Assert.Equal("Test", job.JobTitle);
        Assert.Equal(jobId, job.Id);
        Assert.Equal(1, job.EmployerId);
    }

    [Fact]
    public async Task DeleteJobShouldThrowForbiddenException()
    {
        //Arrange
        var jobId = 1;
        var employerId = 1;
        _employerServiceMock.Setup(us => us.GetCurrentEmployerId()).Returns(employerId);
        _incompleteJobQueryRepository.Setup(r => r.GetIncompleteJobById(jobId)).ReturnsAsync(
            new IncompleteJob
            {
                Id = jobId,
                JobTitle = "Test",
                EmployerId = 2,
                Employer = EmployerFixtures.SecondEmployerEntity
            });

        //Act
        //Assert
        await Assert.ThrowsAsync<ForbiddenException>(async () =>
            await _incompleteJobService.DeleteIncompleteJob(jobId));
    }
}