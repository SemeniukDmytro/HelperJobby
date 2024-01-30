using System.Net;
using API_IntegrationTests.Fixtures;
using HelperJobby.DTOs.Resume;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class SkillControllerTests : IntegrationTest

{
    private readonly string _baseUri = "/api/Skill";

    public SkillControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetSkill_ShouldReturnSkill()
    {
        // Arrange
        await AuthenticateAsync();
        var createdSkill = await AddSkill();
        var requestUri = $"{_baseUri}/{createdSkill.Id}";

        // Act
        var getSkillResponse = await TestClient.GetAsync(requestUri);

        // Assert
        Assert.Equal(HttpStatusCode.OK, getSkillResponse.StatusCode);
        var receivedSkill = await getSkillResponse.Content.ReadAsAsync<SkillDTO>();
        Assert.Equal(createdSkill.Id, receivedSkill.Id);
        Assert.Equal(createdSkill.ResumeId, receivedSkill.ResumeId);
        Assert.Equal(createdSkill.Name, receivedSkill.Name);
    }

    [Fact]
    public async Task CreateSkill_ShouldReturnCreatedSkill()
    {
        // Arrange
        await AuthenticateAsync();
        var createdResume = await CreateResume();
        var requestUri = $"{_baseUri}/{createdResume.Id}";
        var createdSkill = SkillFixtures.FirstSkill;

        // Act
        var createSkillResponse = await TestClient.PostAsJsonAsync(requestUri, createdSkill);

        // Assert
        Assert.Equal(HttpStatusCode.OK, createSkillResponse.StatusCode);
        var receivedSkill = await createSkillResponse.Content.ReadAsAsync<SkillDTO>();
        Assert.Equal(createdResume.Id, receivedSkill.ResumeId);
        Assert.Equal(createdSkill.Name, receivedSkill.Name);
    }

    [Fact]
    public async Task DeleteSkill_ShouldDeleteSkill()
    {
        // Arrange
        await AuthenticateAsync();
        var createdSkill = await AddSkill();
        var requestUri = $"{_baseUri}/{createdSkill.Id}";

        // Act
        var deleteSkillResponse = await TestClient.DeleteAsync(requestUri);

        // Assert
        Assert.Equal(HttpStatusCode.OK, deleteSkillResponse.StatusCode);
        var getSkillResponse = await TestClient.GetAsync(requestUri);
        Assert.Equal(HttpStatusCode.NotFound, getSkillResponse.StatusCode);
    }
}