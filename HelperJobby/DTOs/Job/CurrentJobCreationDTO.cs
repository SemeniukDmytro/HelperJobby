using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class CurrentJobCreationDTO
{
    public string JobTitle { get; set; }
    public int NumberOfOpenings { get; set; }
    public string Language { get; set; }
    public string Location { get; set; }
    public JobTypes JobType { get; set; }
    public decimal Salary { get; set; }
    public Schedules Schedule { get; set; }
    public EmployeeBenefits Benefits { get; set; }
    public string ContactEmail { get; set; }
    public bool ResumeRequired { get; set; }
    public string Description { get; set; }
}