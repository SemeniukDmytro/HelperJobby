using System.Net;
using API_IntegrationTests.Fixtures;
using HelperJobby.DTOs.Resume;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class EducationControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/education";
    
    public EducationControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetEducation_ShouldReturnEducation()
    {
        //Arrange
        await AuthenticateAsync();
        var createdEducation = await CreateEducation();
        var requestUri = $"{_baseUri}/{createdEducation.Id}";
        
        //Act
        var getEducationResponse = await TestClient.GetAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getEducationResponse.StatusCode);
        var receivedEducation = await getEducationResponse.Content.ReadAsAsync<EducationDTO>();
        Assert.Equal(createdEducation.Id, receivedEducation.Id);
        Assert.Equal(createdEducation.ResumeId, receivedEducation.ResumeId);
        Assert.Equal(createdEducation.LevelOfEducation, createdEducation.LevelOfEducation);
    }
    
    
    [Fact]
    public async Task CreateEducation_ShouldReturnCreatedEducation()
    {
        //Arrange
        await AuthenticateAsync();
        var createdResume = await CreateResume();
        var requestUri = $"{_baseUri}/{createdResume.Id}";
        var createdEducation = EducationFixtures.FirstEducation;
        
        //Act
        var createEducationResponse = await TestClient.PostAsJsonAsync(requestUri, createdEducation);

        //Assert
        Assert.Equal(HttpStatusCode.OK, createEducationResponse.StatusCode);
        var receivedEducation = await createEducationResponse.Content.ReadAsAsync<EducationDTO>();
        Assert.Equal(createdResume.Id, receivedEducation.ResumeId);
        Assert.Equal(receivedEducation.LevelOfEducation, receivedEducation.LevelOfEducation);
    }

    [Fact]
    public async Task UpdateEducation_ShouldReturnUpdatedEducation()
    {
        //Arrange
        await AuthenticateAsync();
        var createdEducation = await CreateEducation();
        var requestUri = $"{_baseUri}/{createdEducation.Id}";
        var updatedEducationDTO = new CreateUpdateEducationDTO()
        {
            LevelOfEducation = "Master's",
            FieldOfStudy = "Computer Science",
            SchoolName = "Example University",
            Country = "USA",
            City = "New York",
            From = null,
            To = new DateOnly(2014, 5, 30)
        };
        
        //Act
        var updateEducationResponse = await TestClient.PutAsJsonAsync(requestUri, updatedEducationDTO);

        //Assert
        Assert.Equal(HttpStatusCode.OK, updateEducationResponse.StatusCode);
        var updatedEducation = await updateEducationResponse.Content.ReadAsAsync<EducationDTO>();
        Assert.Equal(updatedEducationDTO.LevelOfEducation, updatedEducation.LevelOfEducation);
        Assert.Equal(updatedEducationDTO.From, updatedEducation.From);
        Assert.Equal(createdEducation.Id, updatedEducation.Id);

    }
    
    [Fact]
    public async Task DeleteEducation_ShouldDeleteEducation()
    {
        //Arrange
        await AuthenticateAsync();
        var createdEducation = await CreateEducation();
        var requestUri = $"{_baseUri}/{createdEducation.Id}";
        
        //Act
        var deleteEducationResponse = await TestClient.DeleteAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, deleteEducationResponse.StatusCode);
        var getEducationResponse = await TestClient.GetAsync(requestUri);
        Assert.Equal(HttpStatusCode.InternalServerError, getEducationResponse.StatusCode);
    }
}