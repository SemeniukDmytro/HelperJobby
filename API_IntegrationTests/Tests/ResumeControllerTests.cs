using System.Net;
using API_IntegrationTests.Fixtures;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Resume;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class ResumeControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/resume";
    
    public ResumeControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetResume_ShouldReturnResume()
    {
        //Arrange
        await AuthenticateAsync();
        var createdResume = await CreateResume();
        var requestUri = $"{_baseUri}/{createdResume.Id}";
        
        //Act
        var getResumeResponse = await TestClient.GetAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getResumeResponse.StatusCode);
        var receivedResume = await getResumeResponse.Content.ReadAsAsync<ResumeDTO>();
        Assert.Equal(createdResume.Id, receivedResume.Id);
        Assert.Equal(createdResume.JobSeekerAccountId, createdResume.JobSeekerAccountId);
        Assert.Equal(createdResume.WorkExperiences[0].JobTitle, receivedResume.WorkExperiences[0].JobTitle);
    }

    [Fact]
    public async Task CreateResume_ShouldReturnCreatedResume()
    {
        //Arrange
        var currentUser = await AuthenticateAsync();
        var getCurrentJobSeekerResponse = await TestClient.GetAsync("api/JobSeekerAccount/current-job-seeker");
        var jobSeeker = await getCurrentJobSeekerResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var createdResumeDTO = ResumeFixtures.Resume;
        var requestUri = _baseUri;
        
        //Act
        var createResumeResponse = await TestClient.PostAsJsonAsync(requestUri, createdResumeDTO);

        //Assert
        Assert.Equal(HttpStatusCode.OK, createResumeResponse.StatusCode);

        var createdResume = await createResumeResponse.Content.ReadAsAsync<ResumeDTO>();
        Assert.NotEqual(0, createdResume.Id);
        Assert.Equal(createdResume.JobSeekerAccountId, jobSeeker.Id);
        Assert.Equal(createdResumeDTO.Educations[0].LevelOfEducation, createdResume.Educations[0].LevelOfEducation);

    }
    
    [Fact]
    public async Task DeleteResume_ShouldDeleteResume()
    {
        //Arrange
        await AuthenticateAsync();
        var createdResume = await CreateResume();
        var requestUri = $"{_baseUri}/{createdResume.Id}";
        
        //Act
        var deleteResumeResponse = await TestClient.DeleteAsync(requestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, deleteResumeResponse.StatusCode);
        var getResumeResponse = await TestClient.GetAsync(requestUri);
        Assert.Equal(HttpStatusCode.InternalServerError, getResumeResponse.StatusCode);
    }
}