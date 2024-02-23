using System.Net;
using API_IntegrationTests.Fixtures;
using HelperJobby.DTOs.Resume;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class WorkExperienceControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/WorkExperience";

    public WorkExperienceControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetWorkExperience_ShouldReturnWorkExperience()
    {
        // Arrange
        await AuthenticateAsync();
        var createdWorkExperience = await CreateWorkExperience();
        var requestUri = $"{_baseUri}/{createdWorkExperience.Id}";

        // Act
        var getWorkExperienceResponse = await TestClient.GetAsync(requestUri);

        // Assert
        Assert.Equal(HttpStatusCode.OK, getWorkExperienceResponse.StatusCode);
        var receivedWorkExperience = await getWorkExperienceResponse.Content.ReadAsAsync<WorkExperienceDTO>();
        Assert.Equal(createdWorkExperience.Id, receivedWorkExperience.Id);
        Assert.Equal(createdWorkExperience.ResumeId, receivedWorkExperience.ResumeId);
        Assert.Equal(createdWorkExperience.JobTitle, receivedWorkExperience.JobTitle);
    }

    [Fact]
    public async Task CreateWorkExperience_ShouldReturnCreatedWorkExperience()
    {
        // Arrange
        await AuthenticateAsync();
        var createdResume = await CreateResume();
        var requestUri = $"{_baseUri}/{createdResume.Id}";
        var createdWorkExperience = WorkExperienceFixtures.FirstUpdateWorkExperience;

        // Act
        var createWorkExperienceResponse = await TestClient.PostAsJsonAsync(requestUri, createdWorkExperience);

        // Assert
        Assert.Equal(HttpStatusCode.OK, createWorkExperienceResponse.StatusCode);
        var receivedWorkExperience = await createWorkExperienceResponse.Content.ReadAsAsync<WorkExperienceDTO>();
        Assert.Equal(createdResume.Id, receivedWorkExperience.ResumeId);
        Assert.Equal(createdWorkExperience.JobTitle, receivedWorkExperience.JobTitle);
    }

    [Fact]
    public async Task UpdateWorkExperience_ShouldReturnUpdatedWorkExperience()
    {
        // Arrange
        await AuthenticateAsync();
        var createdWorkExperience = await CreateWorkExperience();
        var requestUri = $"{_baseUri}/{createdWorkExperience.Id}";
        var updatedWorkExperienceDTO = new CreateUpdateWorkExperienceDTO
        {
            JobTitle = "Product Manager",
            Company = "NewCompany Inc.",
            Country = "USA",
            CityOrProvince = "San Francisco",
            From = null,
            To = new DateOnly(2022, 12, 31),
            CurrentlyWorkHere = true,
            Description = "Managed product development and strategy."
        };

        // Act
        var updateWorkExperienceResponse = await TestClient.PutAsJsonAsync(requestUri, updatedWorkExperienceDTO);

        // Assert
        Assert.Equal(HttpStatusCode.OK, updateWorkExperienceResponse.StatusCode);
        var updatedWorkExperience = await updateWorkExperienceResponse.Content.ReadAsAsync<WorkExperienceDTO>();
        Assert.Equal(updatedWorkExperienceDTO.JobTitle, updatedWorkExperience.JobTitle);
        Assert.Equal(updatedWorkExperienceDTO.From, updatedWorkExperience.From);
        Assert.Equal(createdWorkExperience.Id, updatedWorkExperience.Id);
    }

    [Fact]
    public async Task DeleteWorkExperience_ShouldDeleteWorkExperience()
    {
        // Arrange
        await AuthenticateAsync();
        var createdWorkExperience = await CreateWorkExperience();
        var requestUri = $"{_baseUri}/{createdWorkExperience.Id}";

        // Act
        var deleteWorkExperienceResponse = await TestClient.DeleteAsync(requestUri);

        // Assert
        Assert.Equal(HttpStatusCode.OK, deleteWorkExperienceResponse.StatusCode);
        var getWorkExperienceResponse = await TestClient.GetAsync(requestUri);
        Assert.Equal(HttpStatusCode.NotFound, getWorkExperienceResponse.StatusCode);
    }
}