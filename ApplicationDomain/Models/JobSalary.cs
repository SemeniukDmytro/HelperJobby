using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class JobSalary
{
    public int Id { get; set; }

    [Required] public ShowPayByOptions ShowPayByOption { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal MinimalAmount { get; set; }

    [Column(TypeName = "decimal(10,2)")] public decimal? MaximalAmount { get; set; }

    [Required] public SalaryRates SalaryRate { get; set; }

    [Required] [DefaultValue(true)] public bool MeetsMinSalaryRequirement { get; set; }

    [Required] [ForeignKey("Job")] public int JobId { get; set; }

    public Job Job { get; set; }
}