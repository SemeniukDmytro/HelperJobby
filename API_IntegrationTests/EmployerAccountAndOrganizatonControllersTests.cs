using System.Net;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using FluentAssertions;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.User;

namespace API_IntegrationTests;

public class EmployerAccountAndOrganizatonControllersTests : IntegrationTest
{
    [Fact]
    public async Task CreateEmployerAccount_ShouldReturnCreatedEmployerAccountAndCreateNewOrganization_IfOrganizationDoesNotExist()
    {
        //Arrange
        var newUser = NewUsersFixtures.newUser;
        await RegisterNewUser(newUser);
        var user = await LoginUser(newUser.Email, newUser.Password);
        var requestUri = "/api/employerAccount";
        var createdEmployer = new CreateEmployerAccountDTO()
        {
            FullName = "test name",
            Email = RandomStringGenerator.GenerateRandomEmail(), 
            OrganizationName = RandomStringGenerator.GenerateRandomString(15),
            ContactNumber = RandomStringGenerator.GenerateRandomNumberWithPlus(10),
            NumberOfEmployees = 10
        };
        //Act
        var employerCreationResponse = await TestClient.PostAsJsonAsync(requestUri, createdEmployer);
        //Assert
        employerCreationResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var employer = await employerCreationResponse.Content.ReadAsAsync<EmployerAccountDTO>();
        Assert.NotEqual(0, employer.Id);
        Assert.NotEqual(0, employer.Organization.Id);
        Assert.Equal(employer.Email, createdEmployer.Email);
        Assert.Equal(createdEmployer.OrganizationName, employer.Organization.Name);
    }
}