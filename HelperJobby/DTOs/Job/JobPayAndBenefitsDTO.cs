using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class JobPayAndBenefitsDTO
{
    public decimal Salary { get; set; }
    public EmployeeBenefits Benefits { get; set; }
}