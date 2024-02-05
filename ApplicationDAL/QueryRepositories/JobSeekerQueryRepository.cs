using ApplicationDAL.Context;
using ApplicationDAL.DALHelpers;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobSeekerQueryRepository : IJobSeekerQueryRepository
{
    private readonly ApplicationContext _applicationContext;
    private readonly EntityInclusionHandler _entityInclusionHandler;

    public JobSeekerQueryRepository(ApplicationContext applicationContext,
        EntityInclusionHandler entityInclusionHandler)
    {
        _applicationContext = applicationContext;
        _entityInclusionHandler = entityInclusionHandler;
    }

    public async Task<JobSeeker> GetJobSeekerByUserId(int userId)
    {
        var jobSeekerAccount =
            await _applicationContext.JobSeekers.Where(j => j.UserId == userId).FirstOrDefaultAsync();
        return jobSeekerAccount;
    }

    public async Task<JobSeeker> GetJobSeekerWithResume(int userId)
    {
        return await _applicationContext.JobSeekers.Where(j => j.UserId == userId)
            .Select(js => new JobSeeker
            {
                Id = js.Id,
                UserId = js.UserId,
                Resume = js.Resume != null
                    ? new Resume
                    {
                        Id = js.Resume.Id,
                        WorkExperiences = js.Resume.WorkExperiences,
                        Educations = js.Resume.Educations,
                        Skills = js.Resume.Skills,
                        JobSeekerId = js.Resume.JobSeekerId
                    }
                    : null
            }).FirstOrDefaultAsync();
    }

    public async Task<JobSeeker> GetJobSeekerWithJobInteractions(int userId)
    {
        var retrievedJobSeeker = await _applicationContext.JobSeekers.Where(j => j.UserId == userId)
            .Select(js => new JobSeeker
            {
                Id = js.Id,
                Resume = js.Resume,
                JobApplies = js.JobApplies,
                SavedJobs = js.SavedJobs
            }).FirstOrDefaultAsync();

        if (retrievedJobSeeker == null) throw new UserNotFoundException("User with specified id wasn't found");

        return retrievedJobSeeker;
    }

    public async Task<JobSeeker> GetJobSeekerWithAddress(int userId)
    {
        return await GetUserWithJobSeekerAccount(userId, q => q.Include(u => u.JobSeeker)
            .ThenInclude(a => a.Address));
    }

    public async Task<JobSeeker> GetJobSeekerWithAddressAndResume(int userId)
    {
        var jobSeekerAccount =
            await _applicationContext.JobSeekers.Where(j => j.UserId == userId)
                .Select(j => new JobSeeker
                {
                    Id = j.Id,
                    FirstName = j.FirstName,
                    LastName = j.LastName,
                    AddressId = j.AddressId,
                    Address = j.Address,
                    Resume = j.Resume,
                    PhoneNumber = j.PhoneNumber,
                    UserId = j.UserId
                }).FirstOrDefaultAsync();
        return jobSeekerAccount;
    }

    public async Task<IEnumerable<SavedJob>> GetJobSeekerSavedJobs(int userId)
    {
        var savedJobs = await _applicationContext.SavedJobs
            .Where(sj => sj.JobSeeker.UserId == userId)
            .Select(sj => new SavedJob
            {
                JobId = sj.JobId,
                JobSeekerId = sj.JobSeekerId,
                Job = new Job
                {
                    Id = sj.JobId,
                    JobTitle = sj.Job.JobTitle,
                    Employer = new Employer
                    {
                        Id = sj.Job.EmployerId,
                        Organization = new Organization
                        {
                            Id = sj.Job.Employer.OrganizationId,
                            Name = sj.Job.Employer.Organization.Name
                        }
                    },
                    Location = sj.Job.Location
                },
                DateSaved = sj.DateSaved
            }).ToListAsync();
        return savedJobs;
    }


    public async Task<IEnumerable<JobApply>> GetJobSeekerWithJobApplies(int userId)
    {
        var jobApplies = await _applicationContext.JobApplies.Where(i => i.JobSeeker.UserId == userId)
            .Select(ja => new JobApply
            {
                JobId = ja.JobId,
                JobSeekerId = ja.JobSeekerId,
                DateApplied = ja.DateApplied,
                Job = new Job
                {
                    Id = ja.JobId,
                    JobTitle = ja.Job.JobTitle,
                    Employer = new Employer
                    {
                        Id = ja.Job.EmployerId,
                        Organization = new Organization
                        {
                            Id = ja.Job.Employer.OrganizationId,
                            Name = ja.Job.Employer.Organization.Name
                        }
                    },
                    Location = ja.Job.Location
                }
            }).ToListAsync();
        return jobApplies;
    }

    public async Task<IEnumerable<Interview>> GetJobSeekerWithInterviews(int userId)
    {
        var interviews = await _applicationContext.Interviews.Where(i => i.JobSeeker.UserId == userId)
            .Select(i => new Interview
            {
                JobId = i.JobId,
                JobSeekerId = i.JobSeekerId,
                InterviewStart = i.InterviewStart,
                InterviewEnd = i.InterviewEnd,
                InterviewType = i.InterviewType,
                AppointmentInfo = i.AppointmentInfo,
                Job = new Job
                {
                    Id = i.JobId,
                    JobTitle = i.Job.JobTitle,
                    Employer = new Employer
                    {
                        Id = i.Job.EmployerId,
                        Organization = new Organization
                        {
                            Id = i.Job.Employer.OrganizationId,
                            Name = i.Job.Employer.Organization.Name
                        }
                    },
                    Location = i.Job.Location
                }
            }).ToListAsync();
        return interviews;
    }


    private async Task<JobSeeker> GetUserWithJobSeekerAccount(int userId,
        Func<IQueryable<User>, IQueryable<User>> includeFunc = null)
    {
        var query = _applicationContext.Users.AsQueryable();
        if (includeFunc != null) query = includeFunc(query);
        var user = await _entityInclusionHandler.GetUser(userId, includeFunc);
        var account = user.JobSeeker;
        return account;
    }
}