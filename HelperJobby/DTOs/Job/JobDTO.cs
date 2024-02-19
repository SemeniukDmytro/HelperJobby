using ApplicationDomain.Enums;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.UserJobInteractions;

namespace HelperJobby.DTOs.Job;

public class JobDTO
{
    public int Id { get; set; }
    public string JobTitle { get; set; }
    public int NumberOfOpenings { get; set; }
    public string Language { get; set; }
    public string Location { get; set; }
    public string LocationCountry { get; set; }
    public JobLocationTypes JobLocationType { get; set; }
    public List<JobTypes> JobType { get; set; }
    public JobSalaryDTO Salary { get; set; }
    public List<Schedules> Schedule { get; set; }
    public List<EmployeeBenefits> Benefits { get; set; }
    public string ContactEmail { get; set; }
    public string? ContactPhoneNumber { get; set; } 
    public ResumeRequirementOptions ResumeRequired { get; set; }
    public string Description { get; set; }
    public DateOnly DatePosted { get; set; }
    public int NumberOfPeopleHired { get; set; }
    public int NumberOfJobApplies { get; set; }
    public int NumberOfInterviews { get; set; }
    public int EmployerId { get; set; }
    public EmployerDTO Employer { get; set; }
    public List<InterviewDTO> Interviews { get; set; }
    public List<JobApplyDTO> JobApplies { get; set; }
}