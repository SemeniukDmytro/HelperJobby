using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using FluentAssertions;
using HelperJobby.DTOs.Account;
using Xunit.Abstractions;

namespace API_IntegrationTests.Tests;

public class EmployerAccountControllerTests : IntegrationTest
{

    public EmployerAccountControllerTests(ITestOutputHelper testOutputHelper) : base(testOutputHelper)
    {
    }

    [Fact]
    public async Task CreateEmployerAccount_ShouldReturnCreatedEmployerAccountAndCreateNewOrganization_IfOrganizationDoesNotExist()
    {
        //Arrange
        await AuthenticateAsync();
        var requestUri = "/api/employerAccount";
        var createdEmployer = NewEmployerFixtures.EmployerWithRandomOrganization;
        
        //Act
        var employerCreationResponse = await TestClient.PostAsJsonAsync(requestUri, createdEmployer);
        await LogHelper.LogNotSuccessfulResponse(employerCreationResponse, TestOutputHelper);
        
        //Assert
        employerCreationResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var employer = await employerCreationResponse.Content.ReadAsAsync<EmployerAccountDTO>();
        Assert.NotEqual(0, employer.Id);
        Assert.NotEqual(0, employer.Organization.Id);
        Assert.Equal(employer.Email, createdEmployer.Email);
        Assert.Equal(createdEmployer.OrganizationName, employer.Organization.Name);
    }

    [Fact]
    public async Task CreateEmployerAccount_ShouldReturnCreatedAccount_IfEmployerEmailIsInOrganizationEmailsList()
    {
        //Arrange
        var requestUri = "/api/employerAccount";
        var employerWithCreatedOrganization = await CreateEmployerWithNewOrganizationForAuthUser();
        await TestClient.PostAsJsonAsync($"/api/organization/{employerWithCreatedOrganization.Organization.Id}/add-employee",
            EmployeeEmailsFixtures.emailForAdding); 
        await AuthenticateAsync();
        var newEmployer = NewEmployerFixtures.EmployerCreationInCreatedOrganization;
        newEmployer.OrganizationName = employerWithCreatedOrganization.Organization.Name;
        //Act
        var employerCreationResponse = await TestClient.PostAsJsonAsync(requestUri, newEmployer);
        await LogHelper.LogNotSuccessfulResponse(employerCreationResponse, TestOutputHelper);
        
        //Assert
        employerCreationResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var employer = await employerCreationResponse.Content.ReadAsAsync<EmployerAccountDTO>();
        Assert.NotEqual(0, employer.Id);
        Assert.NotEqual(0, employer.Organization.Id);
        Assert.Equal(newEmployer.Email, employer.Email);
        Assert.Equal(newEmployer.OrganizationName, employerWithCreatedOrganization.Organization.Name);
    }

    [Fact]
    public async Task UpdateEmployerAccount_ShouldReturnUpdatedEmployerAccount()
    {
        //Arrange
        var currentEmployer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = $"/api/employerAccount/{currentEmployer.UserId}";
        UpdateEmployerAccountDTO updateEmployerAccountDTO = new UpdateEmployerAccountDTO()
        {
            Email = "newemail@gmail.com",
            ContactNumber = ""
        };
        
        //Act
        var response = await TestClient.PutAsJsonAsync(requestUri, updateEmployerAccountDTO);
        await LogHelper.LogNotSuccessfulResponse(response, TestOutputHelper);
        
        //Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var updatedEmployer = await response.Content.ReadAsAsync<EmployerAccountDTO>();
        Assert.Equal(currentEmployer.Id, updatedEmployer.Id);
        Assert.Equal(currentEmployer.ContactNumber, updatedEmployer.ContactNumber);
        Assert.Equal(currentEmployer.UserId, updatedEmployer.UserId);
        Assert.Equal(updateEmployerAccountDTO.Email, updatedEmployer.Email);
    }

    [Fact]
    public async Task GetEmployerAccountByUserId_ShouldReturnEmployerAccount()
    {
        //Arrange
        var createdEmployer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = $"/api/EmployerAccount/{createdEmployer.UserId}";

        //Act
        var response = await TestClient.GetAsync(requestUri);
        await LogHelper.LogNotSuccessfulResponse(response, TestOutputHelper);
        //Assert
        var employer = await response.Content.ReadAsAsync<EmployerAccountDTO>();
        Assert.Equal(createdEmployer.Id, employer.Id);
        Assert.Equal(createdEmployer.Email, employer.Email);
    }
    
    [Fact]
    public async Task GetCurrenEmployer_ShouldReturnEmployerAccount()
    {
        //Arrange
        var createdEmployer = await CreateEmployerWithNewOrganizationForAuthUser();
        var requestUri = $"/api/EmployerAccount/my-employer-account";

        //Act
        var response = await TestClient.GetAsync(requestUri);
        await LogHelper.LogNotSuccessfulResponse(response, TestOutputHelper);
        //Assert
        var employer = await response.Content.ReadAsAsync<EmployerAccountDTO>();
        Assert.Equal(createdEmployer.Id, employer.Id);
        Assert.Equal(createdEmployer.Email, employer.Email);
    }
}