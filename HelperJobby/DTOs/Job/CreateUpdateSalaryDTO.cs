using ApplicationDomain.Enums;

namespace HelperJobby.DTOs.Job;

public class CreateUpdateSalaryDTO
{
    public ShowPayByOptions ShowPayByOption { get; set; }
    public decimal MinimalAmount { get; set; }
    public decimal? MaximalAmount { get; set; }
    public SalaryRates SalaryRate { get; set; }
}