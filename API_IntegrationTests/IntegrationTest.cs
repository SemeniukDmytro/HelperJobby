using System.Net.Http.Headers;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDAL.Context;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.User;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Xunit.Abstractions;

namespace API_IntegrationTests;

public class IntegrationTest
{
    protected readonly HttpClient TestClient;
    protected readonly ITestOutputHelper TestOutputHelper;

    protected IntegrationTest(ITestOutputHelper testOutputHelper)
    {
        TestOutputHelper = testOutputHelper;
        var connectionString =
            "Server=34.132.58.30; User=root; Database=HelperJobbyTestsDB; Port=3306; Password=aAI9E)1k|d(t\"Jr#;";
        var appFactory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.RemoveAll(typeof(ApplicationContext));
                    services.RemoveAll(typeof(DbContextOptions<ApplicationContext>));
                    services.AddDbContext<ApplicationContext>(options =>
                    options.UseInMemoryDatabase("TestDb"));
                });
            });
        TestClient = appFactory.CreateClient();
    }
    
    protected async Task<UserDTO> AuthenticateAsync()
    {
        CreateUpdateUserDTO newUser = new CreateUpdateUserDTO()
        {
            Email = RandomStringGenerator.GenerateRandomEmail(),
            Password = "randomPwd",
            AccountType = "Employer"
        };
        await RegisterNewUser(newUser);
        var userWithToken = await LoginUser(newUser.Email, newUser.Password);
        return userWithToken.User;
    }

    protected async Task<EmployerAccountDTO> CreateEmployerWithNewOrganizationForAuthUser()
    {
        await AuthenticateAsync();
        var requestUri = "/api/employerAccount";
        var createdEmployer = new CreateEmployerAccountDTO()
        {
            FullName = "test name",
            Email = RandomStringGenerator.GenerateRandomEmail(),
            OrganizationName = RandomStringGenerator.GenerateRandomString(10),
            ContactNumber = RandomStringGenerator.GeneratePhoneNumber(),
            NumberOfEmployees = 10
        };
        var response = await TestClient.PostAsJsonAsync(requestUri, createdEmployer);
        var employerWithCreatedOrganization = await response.Content.ReadAsAsync<EmployerAccountDTO>();
        return employerWithCreatedOrganization;
    }
    
    protected async Task<AuthUserDTO> LoginUser(string email, string password)
    {
        var response = await TestClient.PostAsJsonAsync("/api/auth/sign-in", new LoginUserDTO()
        {
            Email = email,
            Password = password
        });
        var authUserDTO = await response.Content.ReadAsAsync<AuthUserDTO>();
        TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authUserDTO.Token);
        return authUserDTO;
    }

    private async Task RegisterNewUser(CreateUpdateUserDTO newUser)
    {
        await TestClient.PostAsJsonAsync("/api/auth/sign-up", newUser);
    }
    
    
}