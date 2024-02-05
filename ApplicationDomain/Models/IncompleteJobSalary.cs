using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class IncompleteJobSalary
{
    [ExcludeFromUpdate]
    [Key]
    public int Id { get; set; }
    [Required]
    public ShowPayByOptions ShowPayByOption { get; set; }
    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal MinimalAmount { get; set; }
    [Column(TypeName = "decimal(10,2)")]
    public decimal? MaximalAmount { get; set; }
    [Required]
    public SalaryRates SalaryRate { get; set; }
    [ExcludeFromUpdate]
    [Required]
    [ForeignKey("IncompleteJob")]
    public int IncompleteJobId { get; set; }
    [ExcludeFromUpdate]
    public IncompleteJob IncompleteJob { get; set; }
}