using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class JobSalaryDTO
{
    public int Id { get; set; }
    public ShowPayByOptions ShowPayByOption { get; set; }
    public decimal MinimalAmount { get; set; }
    public decimal? MaximalAmount { get; set; }
    public string SalaryRate { get; set; }
    public bool MeetsMinSalaryRequirement { get; set; }
    public int JobId { get; set; }
    public JobDTO Job { get; set; }
}