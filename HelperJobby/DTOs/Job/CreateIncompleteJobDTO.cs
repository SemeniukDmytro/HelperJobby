using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class CreateIncompleteJobDTO
{
    public string JobTitle { get; set; }
    public int NumberOfOpenings { get; set; }
    public string Language { get; set; }
    public string Location { get; set; }
    public List<JobTypes> JobType { get; set; }
    public CreateUpdateSalaryDTO? Salary { get; set; }
    public List<Schedules> Schedule { get; set; }
    public List<EmployeeBenefits> Benefits { get; set; }
    public string? ContactEmail { get; set; }
    public bool? ResumeRequired { get; set; }
    public string? Description { get; set; }
}