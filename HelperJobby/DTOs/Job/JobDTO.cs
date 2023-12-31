using ApplicationDomain.Enums;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.UserJobInteractions;

namespace HelperJobby.DTOs.Job
{
    public class JobDTO
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public int NumberOfOpenings { get; set; }
        public string Language { get; set; }
        public string Location { get; set; }
        public List<string> JobType { get; set; }
        public decimal Salary { get; set; }
        public string SalaryRate { get; set; }
        public string ShowPayBy { get; set; }
        public List<string> Schedule { get; set; }
        public List<string> Benefits { get; set; }
        public string ContactEmail { get; set; }
        public bool ResumeRequired { get; set; }
        public string Description { get; set; }
        public DateOnly DatePosted { get; set; }
        public int EmployerAccountId { get; set; }
        public EmployerAccountDTO EmployerAccount { get; set; }
        public List<InterviewDTO> Interviews { get; set; }
        public List<JobApplyDTO> JobApplies { get; set; }
    }
}
