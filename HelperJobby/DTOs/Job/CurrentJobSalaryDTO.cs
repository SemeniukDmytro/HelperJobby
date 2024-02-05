using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class CurrentJobSalaryDTO
{
    public int Id { get; set; }
    public ShowPayByOptions ShowPayByOption { get; set; }
    public decimal MinimalAmount { get; set; }
    public decimal? MaximalAmount { get; set; }
    public string SalaryRate { get; set; }
    public int CurrentJobId { get; set; }
    public CurrentJobCreationDTO CurrentJob { get; set; }

}