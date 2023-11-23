using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDAL.Context;
using FluentAssertions;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.Resume;
using HelperJobby.DTOs.User;
using HelperJobby.DTOs.UserJobInteractions;
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
    
    protected async Task<CurrentJobCreationDTO> CreateNewCurrentJob(CurrentJobCreateDTO currentJobCreateDTO)
    {
        var newCurrentJob = currentJobCreateDTO;
        var currentJobCreationResponse = await TestClient.PostAsJsonAsync("/api/CurrentJob", newCurrentJob);
        return await currentJobCreationResponse.Content.ReadAsAsync<CurrentJobCreationDTO>();
    }
    
    protected async Task<JobDTO> CreateJob()
    {
        var currentJobCreation = await CreateNewCurrentJob(CurrentJobFixtures.CompletedJobCreation);
        var requestUri = $"/api/job/create-job/{currentJobCreation.Id}";
        var jobCreateResponse = await TestClient.PostAsJsonAsync(requestUri, currentJobCreation.Id);
        return await jobCreateResponse.Content.ReadAsAsync<JobDTO>();
    }

    protected async Task<ResumeDTO> CreateResume()
    {
        var createdResumeDTO = ResumeFixtures.Resume;
        var requestUri = "/api/resume";
        var response = await TestClient.PostAsJsonAsync(requestUri, createdResumeDTO);
        return await response.Content.ReadAsAsync<ResumeDTO>();
    }

    protected async Task<EducationDTO> CreateEducation()
    {
        var createdResume = await CreateResume();
        var requestUri = $"api/education/{createdResume.Id}";
        var createdEducation = EducationFixtures.FirstEducation;
        var createEducationResponse = await TestClient.PostAsJsonAsync(requestUri, createdEducation);
        return await createEducationResponse.Content.ReadAsAsync<EducationDTO>();
    }
    
    protected async Task<WorkExperienceDTO> CreateWorkExperience()
    {
        var createdResume = await CreateResume();
        var requestUri = $"api/WorkExperience/{createdResume.Id}";
        var createWorkExperienceDto = WorkExperienceFixtures.FirstWorkExperience;
        var createWorkExperienceResponse = await TestClient.PostAsJsonAsync(requestUri, createWorkExperienceDto);
        return await createWorkExperienceResponse.Content.ReadAsAsync<WorkExperienceDTO>();
    }
    
    protected async Task<SkillDTO> AddSkill()
    {
        var createdResume = await CreateResume();
        var requestUri = $"api/Skill/{createdResume.Id}";
        var createdSkill = SkillFixtures.FirstSkill;
        var addSkillResponse = await TestClient.PostAsJsonAsync(requestUri, createdSkill);
        return await addSkillResponse.Content.ReadAsAsync<SkillDTO>();
    }

    protected async Task<InterviewDTO> CreateInterviewByAuthEmployer()
    {
        var user = await AuthenticateAsync();
        var getJobSeekerResponse = await TestClient.GetAsync("api/JobSeekerAccount/current-job-seeker");
        var newJobSeeker = await getJobSeekerResponse.Content.ReadAsAsync<JobSeekerAccountDTO>();
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob(); 
        var requestUri = $"/api/Interview/{createdJob.Id}/job-seeker/{newJobSeeker.Id}"; 
        var createInterviewResponse = await TestClient.PostAsJsonAsync(requestUri, "");
        return await createInterviewResponse.Content.ReadAsAsync<InterviewDTO>();
    }

    private async Task RegisterNewUser(CreateUpdateUserDTO newUser)
    {
        await TestClient.PostAsJsonAsync("/api/auth/sign-up", newUser);
    }
    
    
}