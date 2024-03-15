using ApplicationDAL.Context;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDAL.QueryRepositories;

public class JobApplyQueryRepository : IJobApplyQueryRepository
{
    private readonly ApplicationContext _applicationContext;

    public JobApplyQueryRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<JobApply> GetJobApplyForReview(int jobId, int jobSeekerId)
    {
        var jobApply = await _applicationContext.JobApplies
            .Where(ja => ja.JobId == jobId && ja.JobSeekerId == jobSeekerId)
            .Select(ja => new JobApply()
            {
                JobId = ja.JobId,
                JobSeekerId = ja.JobSeekerId,
                DateApplied = ja.DateApplied,
                JobApplyStatus = ja.JobApplyStatus,
                IsReviewed = ja.IsReviewed,
                Job = new Job()
                {
                    EmployerId = ja.Job.EmployerId,
                    JobTitle = ja.Job.JobTitle,
                    Location = ja.Job.Location
                },
                JobSeeker = new JobSeeker()
                {
                    Id = ja.JobSeeker.Id,
                    FirstName = ja.JobSeeker.FirstName,
                    LastName = ja.JobSeeker.LastName,
                    Resume = ja.JobSeeker.Resume != null
                        ? new Resume()
                        {
                            WorkExperiences = ja.JobSeeker.Resume.WorkExperiences.Select(we => new WorkExperience()
                            {
                                JobTitle = we.JobTitle,
                                Company = we.Company,
                                From = we.From,
                                To = we.To,
                                CurrentlyWorkHere = we.CurrentlyWorkHere
                            }).ToList(),
                            Educations = ja.JobSeeker.Resume.Educations.Select(e => new Education()
                            {
                                LevelOfEducation = e.LevelOfEducation,
                                FieldOfStudy = e.FieldOfStudy
                            }).ToList(),
                            Skills = ja.JobSeeker.Resume.Skills
                        }
                        : null,
                    User = new User()
                    {
                        Email = ja.JobSeeker.User.Email
                    }
                }
            }).FirstOrDefaultAsync();
        if (jobApply == null)
        {
            throw new JobApplyingException("Job apply not found");
        }

        return jobApply;
    }

    public async Task<JobApply> GetJobApplyByJobIdAndJobSeekerId(int jobId, int jobSeekerId)
    {
        var jobApply =
            await _applicationContext.JobApplies.Include(ja => ja.Job).FirstOrDefaultAsync(j =>
                j.JobId == jobId && j.JobSeekerId == jobSeekerId);
        
        if (jobApply == null) throw new JobApplyingException("Job apply wasn't found");

        return jobApply;
    }

    public async Task<IEnumerable<JobApply>> GetJobAppliesByJobSeekerId(int jobSeekerId)
    {
        var jobApplies = await _applicationContext.JobApplies.Where(i => i.JobSeekerId == jobSeekerId)
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
    
    public async Task<JobApply> GetJobApplyForConversation(int jobSeekerId, int jobId)
    {
        var jobApply = await _applicationContext.JobApplies.Where(i => i.JobSeekerId == jobSeekerId && i.JobId == jobId)
            .Select(ja => new JobApply
            {
                JobId = ja.JobId,
                JobSeekerId = ja.JobSeekerId,
                DateApplied = ja.DateApplied,
                Job = new Job
                {
                    Id = ja.Job.Id,
                    JobTitle = ja.Job.JobTitle,
                    NumberOfOpenings = ja.Job.NumberOfOpenings,
                    Location = ja.Job.Location,
                    JobTypes = ja.Job.JobTypes,
                    Salary = ja.Job.Salary,
                    Schedule = ja.Job.Schedule,
                    Benefits = ja.Job.Benefits,
                    Description = ja.Job.Description,
                    DatePosted = ja.Job.DatePosted,
                    EmployerId = ja.Job.EmployerId,
                    Employer = new Employer
                    {
                        Id = ja.Job.EmployerId,
                        FullName = ja.Job.Employer.FullName,
                        Organization = new Organization
                        {
                            Id = ja.Job.Employer.OrganizationId,
                            Name = ja.Job.Employer.Organization.Name
                        }
                    }
                },
                JobSeeker = ja.JobSeeker
            }).FirstOrDefaultAsync();
        if (jobApply == null)
        {
            throw new JobApplyingException("Job apply was not found");
        }
        return jobApply;
    }
}