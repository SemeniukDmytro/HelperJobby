using System.Net.Http.Headers;
using ApplicationDAL.Context;
using HelperJobby.DTOs.User;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace API_IntegrationTests;

public class IntegrationTest
{
    protected readonly HttpClient TestClient;
    protected IntegrationTest()
    {
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
                    {
                        options.UseMySql(connectionString, 
                            ServerVersion.AutoDetect(connectionString),
                            x => x.MigrationsAssembly("ApplicationDAL"));
                        options.EnableSensitiveDataLogging();
                        options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                    });
                });
            });
        TestClient = appFactory.CreateClient();
    }
    
    protected async Task<UserDTO> AuthenticateAsync()
    {
        var authUser = await GetUserAsync();
        TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authUser.Token);
        return authUser.User;
    }

    private async Task<AuthUserDTO> GetUserAsync()
    {
        var response = await TestClient.PostAsJsonAsync("/api/auth/sign-in", new LoginUserDTO()
        {
            Email = "integration_tests@gmail.com",
            Password = "integration_tests"
        });
        var loginResponse = await response.Content.ReadAsAsync<AuthUserDTO>();
        return loginResponse;
    }

    protected async Task RegisterNewUser(string email, string password, string accountType)
    {
        var response = await TestClient.PostAsJsonAsync("/api/auth/sign-up", new CreateUpdateUserDTO()
        {
            Email = email,
            Password = password,
            AccountType = "Job seeker"
        });
    }
    
    
}