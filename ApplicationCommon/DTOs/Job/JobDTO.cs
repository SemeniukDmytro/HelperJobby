using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.UserJobInteractions;
using ApplicationDAL.Enums;

namespace ApplicationCommon.DTOs.Job;

public class JobDTO
{
    public int Id { get; set; }
    public string JobTitle { get; set; }
    public string CompanyName { get; set; }
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
    public int EmployerAccountId { get; set; }
    public EmployerAccountDTO EmployerAccount { get; set; }
    public List<InterviewDTO> Interviews { get; set; }
    public List<JobApplyDTO> JobApplies { get; set; }
}
