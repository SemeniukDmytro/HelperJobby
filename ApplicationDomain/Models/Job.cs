using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class Job
{
    [ExcludeFromUpdate] public int Id { get; set; }

    [Required] [MaxLength(50)] public string JobTitle { get; set; }

    [Required] public int NumberOfOpenings { get; set; }

    [Required] [MaxLength(20)] public string Language { get; set; }

    [Required] [MaxLength(50)] public string Location { get; set; }

    [Required] public JobTypes JobTypes { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Salary { get; set; }

    [Required] [MaxLength(9)] public string SalaryRate { get; set; }

    [Required] [MaxLength(15)] public string ShowPayBy { get; set; }

    [Required] public Schedules Schedule { get; set; }

    public EmployeeBenefits Benefits { get; set; }

    [Required] [MaxLength(50)] public string ContactEmail { get; set; }

    [DefaultValue(false)] public bool ResumeRequired { get; set; }

    [Required] [Column(TypeName = "text")] public string Description { get; set; }

    [Required] public DateOnly DatePosted { get; set; }

    [ExcludeFromUpdate]
    [Required]
    [ForeignKey("EmployerAccount")]
    public int EmployerAccountId { get; set; }

    [ExcludeFromUpdate] public EmployerAccount EmployerAccount { get; set; }

    public List<Interview> Interviews { get; set; }

    public List<JobApply> JobApplies { get; set; }
}