using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class IncompleteJobSalaryDTO
{
    public int Id { get; set; }
    public ShowPayByOptions ShowPayByOption { get; set; }
    public decimal MinimalAmount { get; set; }
    public decimal? MaximalAmount { get; set; }
    public SalaryRates SalaryRate { get; set; }
    public int IncompleteJobId { get; set; }
    public bool MeetsMinSalaryRequirement { get; set; }
    public IncompleteJobDTO IncompleteJob { get; set; }

}