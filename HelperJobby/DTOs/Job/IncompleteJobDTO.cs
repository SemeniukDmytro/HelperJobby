using ApplicationDomain.Enums;
using ApplicationDomain.Models;
using HelperJobby.DTOs.Account;

namespace HelperJobby.DTOs.Job;

public class IncompleteJobDTO
{
    public int Id { get; set; }
    public string JobTitle { get; set; }
    public int NumberOfOpenings { get; set; }
    public string Language { get; set; }
    public string Location { get; set; }
    public string LocationCountry { get; set; }
    public JobLocationTypes JobLocationType { get; set; }
    public List<JobTypes>? JobType { get; set; }
    public IncompleteJobSalaryDTO? Salary { get; set; } 
    public List<Schedules>? Schedule { get; set; }
    public List<EmployeeBenefits>? Benefits { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactPhoneNumber { get; set; } 
    public ResumeRequirementOptions? ResumeRequired { get; set; }
    public string? Description { get; set; }
    public int EmployerId { get; set; }
    public EmployerDTO Employer { get; set; }
}