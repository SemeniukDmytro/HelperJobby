using System.Linq.Expressions;
using ApplicationDomain.MessagingRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDAL.Projections.MessagingProjections;

public class ConversationProjections
{
    public static Expression<Func<Conversation, ConversationWithLastMessage>> ShortConversationInfo()
    {
        return c => new ConversationWithLastMessage()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            JobSeekersUnreadMessagesCount = c.Messages.Count(m => !m.IsRead && m.JobSeekerId == null),
            EmployersUnreadMessagesCount = c.Messages.Count(m => !m.IsRead && m.EmployerId == null),
            EmployerId = c.EmployerId,
            Employer = new Employer()
            {
                Id = c.Employer.Id,
                FullName = c.Employer.FullName,
                Organization = new Organization()
                {
                    Id = c.Employer.Organization.Id,
                    Name = c.Employer.Organization.Name
                }
            },
            JobSeekerId = c.JobSeekerId,
            JobSeeker = new JobSeeker()
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
            },
            JobId = c.JobId,
            Job = new Job()
            {
                Id = c.Job.Id,
                JobTitle = c.Job.JobTitle
            },
            LastConversationMessage = c.Messages.OrderByDescending(m=> m.SentAt).FirstOrDefault()
        };
    }

    public static Expression<Func<Conversation, Conversation>> FullConversationInfo()
    {
        return c => new Conversation()
        {
            Id = c.Id,
            LastModified = c.LastModified,
            JobSeekersUnreadMessagesCount = c.Messages.Count(m => !m.IsRead && m.JobSeekerId == null),
            EmployersUnreadMessagesCount = c.Messages.Count(m => !m.IsRead && m.EmployerId == null),
            Messages = c.Messages,
            EmployerId = c.EmployerId,
            Employer = new Employer()
            {
                Id = c.Employer.Id,
                FullName = c.Employer.FullName,
                Organization = new Organization()
                {
                    Id = c.Employer.Organization.Id,
                    Name = c.Employer.Organization.Name
                }
            },
            JobSeekerId = c.JobSeekerId,
            JobSeeker = new JobSeeker()
            {
                Id = c.JobSeeker.Id,
                FirstName = c.JobSeeker.FirstName,
                LastName = c.JobSeeker.LastName,
                JobApplies = c.JobSeeker.JobApplies.Where(j => c.JobSeekerId == j.JobSeekerId && c.JobId == j.JobId).ToList()
            },
            JobId = c.JobId,
            Job = new Job
            {
                Id = c.Job.Id,
                JobTitle = c.Job.JobTitle,
                NumberOfOpenings = c.Job.NumberOfOpenings,
                Language = c.Job.Language,
                Location = c.Job.Location,
                JobTypes = c.Job.JobTypes,
                Salary = c.Job.Salary,
                Schedule = c.Job.Schedule,
                Benefits = c.Job.Benefits,
                ContactEmail = c.Job.ContactEmail,
                ResumeRequired = c.Job.ResumeRequired,
                Description = c.Job.Description,
                DatePosted = c.Job.DatePosted,
                EmployerId = c.Job.EmployerId,
                Employer = new Employer
                {
                    Organization = new Organization
                    {
                        Id = c.Job.Employer.OrganizationId,
                        Name = c.Job.Employer.Organization.Name
                    }
                }
            }
        };
    }
}