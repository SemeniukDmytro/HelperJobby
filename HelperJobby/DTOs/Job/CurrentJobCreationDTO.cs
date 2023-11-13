using ApplicationDomain.Enums;
using HelperJobby.DTOs.Account;

namespace HelperJobby.DTOs.Job;

public class CurrentJobCreationDTO
{
    public string JobTitle { get; set; }
    public int NumberOfOpenings { get; set; }
    public string Language { get; set; }
    public string Location { get; set; }
    public List<JobTypes> JobType { get; set; }
    public decimal Salary { get; set; }
    public List<Schedules> Schedule { get; set; }
    public List<EmployeeBenefits> Benefits { get; set; }
    public string ContactEmail { get; set; }
    public bool ResumeRequired { get; set; }
    public string Description { get; set; }
    public int EmployerAccountId { get; set; }
    public EmployerAccountDTO EmployerAccount { get; set; }
}