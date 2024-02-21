using System.Linq.Expressions;
using ApplicationDomain.Models;

public static class JobProjections
{
    public static Expression<Func<Job, Job>> JobForJobSeekers()
    {
        return j => new Job
        {
            Id = j.Id,
            JobTitle = j.JobTitle,
            NumberOfOpenings = j.NumberOfOpenings,
            Language = j.Language,
            Location = j.Location,
            JobTypes = j.JobTypes,
            Salary = j.Salary,
            Schedule = j.Schedule,
            Benefits = j.Benefits,
            ContactEmail = j.ContactEmail,
            ResumeRequired = j.ResumeRequired,
            Description = j.Description,
            DatePosted = j.DatePosted,
            EmployerId = j.EmployerId,
            Employer = new Employer
            {
                Organization = new Organization
                {
                    Id = j.Employer.OrganizationId,
                    Name = j.Employer.Organization.Name
                }
            }
        };
    }
    
    public static Expression<Func<Job, Job>> JobWithJobApplies()
    {
        return j => new Job
        {
            Id = j.Id,
            JobTitle = j.JobTitle,
            Location = j.Location,
            ContactEmail = j.ContactEmail,
            ResumeRequired = j.ResumeRequired,
            DatePosted = j.DatePosted,
            EmployerId = j.EmployerId,
            JobApplies = j.JobApplies.Select(ja => new JobApply()
            {
                JobId = ja.JobId,
                JobSeekerId = ja.JobSeekerId,
                DateApplied = ja.DateApplied,
                JobApplyStatus = ja.JobApplyStatus,
                JobSeeker = new JobSeeker()
                {
                    Id = ja.JobSeeker.Id,
                    Resume = ja.JobSeeker.Resume != null ? new Resume() 
                    {
                        WorkExperiences = ja.JobSeeker.Resume.WorkExperiences.Select(we => new WorkExperience()
                        {
                            JobTitle = we.JobTitle
                        }).ToList(),
                        Educations = ja.JobSeeker.Resume.Educations.Select(e => new Education()
                        {
                            FieldOfStudy = e.FieldOfStudy
                        }).ToList(),
                        Skills = ja.JobSeeker.Resume.Skills
                    } : null
                }
            }).ToList()
        };
    }
    
    public static Expression<Func<Job, Job>> JobWithInterviews()
    {
        return j => new Job
        {
            Id = j.Id,
            JobTitle = j.JobTitle,
            Location = j.Location,
            ContactEmail = j.ContactEmail,
            ResumeRequired = j.ResumeRequired,
            DatePosted = j.DatePosted,
            EmployerId = j.EmployerId,
            Interviews = j.Interviews.Select(i => new Interview()
            {
                JobId = i.JobId,
                JobSeekerId = i.JobSeekerId,
                InterviewStart = i.InterviewStart,
                InterviewEnd = i.InterviewEnd,
                InterviewType = i.InterviewType,
                AppointmentInfo = i.AppointmentInfo,
                JobSeeker = new JobSeeker()
                {
                    Id = i.JobSeeker.Id,
                    Resume = i.JobSeeker.Resume != null ? new Resume() 
                    {
                        WorkExperiences = i.JobSeeker.Resume.WorkExperiences.Select(we => new WorkExperience()
                        {
                            JobTitle = we.JobTitle
                        }).ToList(),
                        Educations = i.JobSeeker.Resume.Educations.Select(e => new Education()
                        {
                            FieldOfStudy = e.FieldOfStudy
                        }).ToList(),
                        Skills = i.JobSeeker.Resume.Skills
                    } : null
                }
            }).ToList()
        };
    }
}