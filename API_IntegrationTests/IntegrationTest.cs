using System.Net.Http.Headers;
using API_IntegrationTests.Fixtures;
using API_IntegrationTests.TestHelpers;
using ApplicationDAL.Context;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.Resume;
using HelperJobby.DTOs.User;
using HelperJobby.DTOs.UserJobInteractions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Xunit.Abstractions;

namespace API_IntegrationTests;

public class IntegrationTest
{
    protected readonly HttpClient TestClient;
    protected readonly ITestOutputHelper TestOutputHelper;

    protected IntegrationTest(ITestOutputHelper testOutputHelper)
    {
        TestOutputHelper = testOutputHelper;
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
        var newUser = new CreateUpdateUserDTO
        {
            Email = RandomStringGenerator.GenerateRandomEmail(),
            Password = "randomPwd",
            AccountType = "Employer"
        };
        var authUserDTO = await RegisterNewUser(newUser);
        TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authUserDTO.Token);
        return authUserDTO.User;
    }

    protected async Task UpdateAuthToken(LoginUserDTO loginUserDTO)
    {
        var loginResponse = await TestClient.PostAsJsonAsync("api/auth/sign-in", loginUserDTO);
        var authUser = await loginResponse.Content.ReadAsAsync<AuthUserDTO>();
        TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authUser.Token);
    }

    protected async Task<EmployerDTO> CreateEmployerWithNewOrganizationForAuthUser()
    {
        var createdUser = await AuthenticateAsync();
        var requestUri = "/api/employer";
        var createdEmployer = new CreateEmployerDTO
        {
            FullName = "test name",
            Email = RandomStringGenerator.GenerateRandomEmail(),
            OrganizationName = RandomStringGenerator.GenerateRandomString(10),
            ContactNumber = RandomStringGenerator.GeneratePhoneNumber(),
            NumberOfEmployees = 10
        };
        var response = await TestClient.PostAsJsonAsync(requestUri, createdEmployer);
        var employerWithCreatedOrganization = await response.Content.ReadAsAsync<EmployerDTO>();
        var loginUserDTO = new LoginUserDTO
        {
            Email = createdUser.Email,
            Password = "randomPwd"
        };
        await UpdateAuthToken(loginUserDTO);
        employerWithCreatedOrganization.User = createdUser;
        return employerWithCreatedOrganization;
    }

    protected async Task<JobSeekerDTO> GetCurrentJobSeekerAccount()
    {
        await AuthenticateAsync();
        var getJobSeekerRequestUri = "api/JobSeeker/current-job-seeker";
        var jobSeekerResponse = await TestClient.GetAsync(getJobSeekerRequestUri);
        return await jobSeekerResponse.Content.ReadAsAsync<JobSeekerDTO>();
    }

    protected async Task<AuthUserDTO> LoginUser(string email, string password)
    {
        var response = await TestClient.PostAsJsonAsync("/api/auth/sign-in", new LoginUserDTO
        {
            Email = email,
            Password = password
        });
        var authUserDTO = await response.Content.ReadAsAsync<AuthUserDTO>();
        TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authUserDTO.Token);
        return authUserDTO;
    }

    protected async Task<IncompleteJobDTO> CreateNewCurrentJob(CreateIncompleteJobDTO createdIncompleteJobDto)
    {
        var currentJobCreationResponse =
            await TestClient.PostAsJsonAsync("/api/IncompleteJob", createdIncompleteJobDto);
        return await currentJobCreationResponse.Content.ReadAsAsync<IncompleteJobDTO>();
    }

    protected async Task<JobDTO> CreateJob()
    {
        var currentJobCreation = await CreateNewCurrentJob(IncompleteJobFixtures.NewJobCreation);
        var requestUri = $"/api/job/{currentJobCreation.Id}";
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
        var createWorkExperienceDto = WorkExperienceFixtures.FirstUpdateWorkExperience;
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
        var newJobSeeker = await GetCurrentJobSeekerAccount();
        var employerAccount = await CreateEmployerWithNewOrganizationForAuthUser();
        var createdJob = await CreateJob();
        var requestUri = $"/api/Interview/{createdJob.Id}/job-seeker/{newJobSeeker.Id}";
        var createInterviewDTO = InterviewFixtures.createInterviewDTO;
        var createInterviewResponse = await TestClient.PostAsJsonAsync(requestUri, createInterviewDTO);
        return await createInterviewResponse.Content.ReadAsAsync<InterviewDTO>();
    }

    protected async Task<InterviewDTO> CreateInterview(int jobId, int jobSeekerId)
    {
        var secondInterviewCreateRequestUri = $"/api/Interview/{jobId}/job-seeker/{jobSeekerId}";
        var createInterviewDTO = InterviewFixtures.createInterviewDTO;
        var interviewCreateResponse =
            await TestClient.PostAsJsonAsync(secondInterviewCreateRequestUri, createInterviewDTO);
        return await interviewCreateResponse.Content.ReadAsAsync<InterviewDTO>();
    }

    private async Task<AuthUserDTO> RegisterNewUser(CreateUpdateUserDTO newUser)
    {
        var response = await TestClient.PostAsJsonAsync("/api/auth/sign-up", newUser);
        return await response.Content.ReadAsAsync<AuthUserDTO>();
    }
}