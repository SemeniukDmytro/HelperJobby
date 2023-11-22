using System.Net;
using System.Net.Http.Json;
using API_IntegrationTests.TestHelpers;
using FluentAssertions;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Address;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class JobSeekerControllerTests : IntegrationTest
{
    private readonly string baseUri = "/api/JobSeekerAccount";
    
    public JobSeekerControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }
    
    [Fact]
    public async Task GetEmployerSavedJobs_ShouldReturnEmployerSavedJobs()
    {
        //Arrange
        var expectedJobCount = 2; //change if create more jobs 
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var firstCreatedJob = await CreateJob();
        var secondCreatedJob = await CreateJob();
        await AuthenticateAsync();
        var jobSeekerAccountResponse = await TestClient.GetAsync($"{baseUri}/current-job-seeker");
        var jobSeeker =
            await jobSeekerAccountResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var saveJobFirstRequestUri = $"{baseUri}/save-job/{firstCreatedJob.Id}/{jobSeeker.Id}";
        var saveJobSecondRequestUri = $"{baseUri}/save-job/{secondCreatedJob.Id}/{jobSeeker.Id}";
        await TestClient.PostAsJsonAsync(saveJobFirstRequestUri, "");
        await TestClient.PostAsJsonAsync(saveJobSecondRequestUri, "");
        
        //Act
        var getSavedJobsResponse = await TestClient.GetAsync("api/JobSeekerAccount/my-saved-jobs");
        await ExceptionsLogHelper.LogNotSuccessfulResponse(getSavedJobsResponse, TestOutputHelper);
        
        //Assert
        Assert.Equal(HttpStatusCode.OK, getSavedJobsResponse.StatusCode);
        
        var savedJobs = (await getSavedJobsResponse.Content.ReadAsAsync<IEnumerable<JobDTO>>()).ToList();
        
        Assert.Equal(expectedJobCount, savedJobs.Count);
        Assert.Equal(firstCreatedJob.Id, savedJobs[0].Id);
        Assert.Equal(firstCreatedJob.JobTitle, savedJobs[0].JobTitle);
        Assert.Equal(secondCreatedJob.Id, savedJobs[1].Id);
        Assert.Equal(secondCreatedJob.JobTitle, savedJobs[1].JobTitle);
    }
    
    [Fact]
    public async Task UpdateJobSeeker_ShouldReturnUpdatedJobSeekerAccount()
    {
        //Arrange
        var currentUser = await AuthenticateAsync();
        var requestUri = $"{baseUri}/{currentUser.Id}";
        var getNotUpdatedJobSeekerAccountResponse = await TestClient.GetAsync($"{baseUri}/current-job-seeker");
        var notUpdateJobSeekerAccount =
            await getNotUpdatedJobSeekerAccountResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var updatedJobSeekerAccountDTO = new UpdatedJobSeekerAccountDTO()
        {
            FirstName = "FirstName",
            LastName = "LadsName",
            PhoneNumber = RandomStringGenerator.GeneratePhoneNumber(),
            Address = new UpdateAddressDTO()
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
        updateJobSeekerResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var updatedJobSeekerAccount = await updateJobSeekerResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        Assert.Equal(notUpdateJobSeekerAccount.Id, updatedJobSeekerAccount.Id);
        Assert.Equal(notUpdateJobSeekerAccount.UserId, updatedJobSeekerAccount.UserId);
        Assert.Equal(updatedJobSeekerAccountDTO.PhoneNumber, updatedJobSeekerAccount.PhoneNumber);
        Assert.Equal(updatedJobSeekerAccountDTO.Address.StreetAddress, updatedJobSeekerAccount.Address.StreetAddress);
    }

    [Fact]
    public async Task SaveJob_ShouldReturnSavedJob()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var newUser = await AuthenticateAsync();
        var getNotUpdatedJobSeekerAccountResponse = await TestClient.GetAsync($"{baseUri}/current-job-seeker");
        var jobSeeker =
            await getNotUpdatedJobSeekerAccountResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var requestUri = $"{baseUri}/save-job/{createdJob.Id}/{jobSeeker.Id}"; 
        
        //Act
        var saveJobResponse = await TestClient.PostAsJsonAsync(requestUri, "");
        saveJobResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        
        //Assert
        Assert.Equal(HttpStatusCode.OK, saveJobResponse.StatusCode);
        var savedJob = await saveJobResponse.Content.ReadAsAsync<SavedJobDTO>();
        Assert.Equal(savedJob.JobId, createdJob.Id);
        Assert.Equal(jobSeeker.Id, savedJob.JobSeekerAccountId);
    }
    
    [Fact]
    public async Task RemoveSavedJob_ShouldRemoveSavedJob()
    {
        //Arrange
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var newUser = await AuthenticateAsync();
        var getNotUpdatedJobSeekerAccountResponse = await TestClient.GetAsync($"{baseUri}/current-job-seeker");
        var jobSeeker =
            await getNotUpdatedJobSeekerAccountResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var saveJobResponse = await TestClient.PostAsJsonAsync($"{baseUri}/save-job/{createdJob.Id}/{jobSeeker.Id}", "");
        var savedJob = await saveJobResponse.Content.ReadAsAsync<SavedJobDTO>();
        var requestUri = $"{baseUri}/delete-saved-job/{savedJob.JobId}/{savedJob.JobSeekerAccountId}"; 
        
        //Act
        var removeSavedJobResponse = await TestClient.DeleteAsync(requestUri);
        await ExceptionsLogHelper.LogNotSuccessfulResponse(removeSavedJobResponse, TestOutputHelper);
        
        //Assert
        Assert.Equal(HttpStatusCode.OK, removeSavedJobResponse.StatusCode);
    }

    
    
}