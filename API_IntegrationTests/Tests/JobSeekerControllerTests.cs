using System.Net;
using API_IntegrationTests.TestHelpers;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Address;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class JobSeekerControllerTests : IntegrationTest
{
    private readonly string _baseUri = "/api/JobSeeker";

    public JobSeekerControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task GetCurrentJobSeekerAccount_ShouldReturnCurrentJobSeeker()
    {
        //Arrange
        var user = await AuthenticateAsync();
        var getJobSeekerRequestUri = "api/JobSeeker/current-job-seeker";

        //Act
        var jobSeekerResponse = await TestClient.GetAsync(getJobSeekerRequestUri);

        //Assert
        Assert.Equal(HttpStatusCode.OK, jobSeekerResponse.StatusCode);
        var jobSeeker = await jobSeekerResponse.Content.ReadAsAsync<JobSeekerDTO>();
        Assert.Equal(user.Id, jobSeeker.UserId);
    }

    [Fact]
    public async Task GetJobSeekerSavedJobs_ShouldReturnEmployerSavedJobs()
    {
        //Arrange
        var expectedJobCount = 2; //change if create more jobs 
        await CreateEmployerWithNewOrganizationForAuthUser();
        var firstCreatedJob = await CreateJob();
        var secondCreatedJob = await CreateJob();
        await AuthenticateAsync();
        var saveJobFirstRequestUri = $"{_baseUri}/save-job/{firstCreatedJob.Id}";
        var saveJobSecondRequestUri = $"{_baseUri}/save-job/{secondCreatedJob.Id}";
        await TestClient.PostAsJsonAsync(saveJobFirstRequestUri, "");
        await TestClient.PostAsJsonAsync(saveJobSecondRequestUri, "");

        //Act
        var getSavedJobsResponse = await TestClient.GetAsync("api/JobSeeker/my-saved-jobs");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getSavedJobsResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, getSavedJobsResponse.StatusCode);

        var savedJobs = (await getSavedJobsResponse.Content.ReadAsAsync<IEnumerable<SavedJobDTO>>()).ToList();

        Assert.Equal(expectedJobCount, savedJobs.Count);
        Assert.Equal(firstCreatedJob.Id, savedJobs[0].Job.Id);
        Assert.Equal(firstCreatedJob.JobTitle, savedJobs[0].Job.JobTitle);
        Assert.Equal(secondCreatedJob.Id, savedJobs[1].Job.Id);
        Assert.Equal(secondCreatedJob.JobTitle, savedJobs[1].Job.JobTitle);
    }

    [Fact]
    public async Task UpdateJobSeeker_ShouldReturnUpdatedJobSeekerAccount()
    {
        //Arrange
        var currentJobSeekerAccount = await GetCurrentJobSeekerAccount();
        var requestUri = $"{_baseUri}/{currentJobSeekerAccount.Id}";
        var updatedJobSeekerAccountDTO = new UpdatedJobSeekerDTO
        {
            FirstName = "FirstName",
            LastName = "LadsName",
            PhoneNumber = RandomStringGenerator.GeneratePhoneNumber(),
            Address = new UpdateAddressDTO
            {
                Country = "County",
                City = "City",
                StreetAddress = "StreetAddress",
                PostalCode = "111 111"
            }
        };

        //Act
        var updateJobSeekerResponse = await TestClient.PutAsJsonAsync(requestUri, updatedJobSeekerAccountDTO);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(updateJobSeekerResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, updateJobSeekerResponse.StatusCode);
        var updatedJobSeekerAccount = await updateJobSeekerResponse.Content.ReadAsAsync<JobSeekerDTO>();
        Assert.Equal(currentJobSeekerAccount.Id, updatedJobSeekerAccount.Id);
        Assert.Equal(currentJobSeekerAccount.UserId, updatedJobSeekerAccount.UserId);
        Assert.Equal(updatedJobSeekerAccountDTO.PhoneNumber, updatedJobSeekerAccount.PhoneNumber);
        Assert.Equal(updatedJobSeekerAccountDTO.Address.StreetAddress, updatedJobSeekerAccount.Address.StreetAddress);
    }

    [Fact]
    public async Task SaveJob_ShouldReturnSavedJob()
    {
        //Arrange
        await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        await AuthenticateAsync();
        var requestUri = $"{_baseUri}/save-job/{createdJob.Id}";

        //Act
        var saveJobResponse = await TestClient.PostAsJsonAsync(requestUri, "");

        //Assert
        Assert.Equal(HttpStatusCode.OK, saveJobResponse.StatusCode);
        var savedJob = await saveJobResponse.Content.ReadAsAsync<SavedJobDTO>();
        Assert.Equal(savedJob.JobId, createdJob.Id);
    }

    [Fact]
    public async Task RemoveSavedJob_ShouldRemoveSavedJob()
    {
        //Arrange
        await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        await AuthenticateAsync();
        var saveJobResponse = await TestClient.PostAsJsonAsync($"{_baseUri}/save-job/{createdJob.Id}", "");
        var savedJob = await saveJobResponse.Content.ReadAsAsync<SavedJobDTO>();
        var requestUri = $"{_baseUri}/delete-saved-job/{savedJob.JobId}";

        //Act
        var removeSavedJobResponse = await TestClient.DeleteAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(removeSavedJobResponse, TestOutputHelper);

        //Assert
        Assert.Equal(HttpStatusCode.OK, removeSavedJobResponse.StatusCode);
    }
}