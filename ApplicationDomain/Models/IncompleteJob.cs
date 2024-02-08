using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Attributes;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class IncompleteJob
{
    [ExcludeFromUpdate] public int Id { get; set; }

    [Required] [MaxLength(50)] public string JobTitle { get; set; }

    [Required] public int NumberOfOpenings { get; set; }

    [Required] [MaxLength(20)] public string Language { get; set; }
    [Required] [MaxLength(50)] public string LocationCountry { get; set; }
    [Required] public JobLocationTypes JobLocationType { get; set; }
    [Required] [MaxLength(50)] public string Location { get; set; }

    public JobTypes? JobTypes { get; set; }
    [ExcludeFromUpdate]
    public IncompleteJobSalary? Salary { get; set; }

    public Schedules? Schedule { get; set; }

    public EmployeeBenefits? Benefits { get; set; }

    [MaxLength(50)] public string? ContactEmail { get; set; }
    [MaxLength(15)] public string? ContactPhoneNumber { get; set; }

    [DefaultValue(0)] public ResumeRequirementOptions? ResumeRequired { get; set; }

    [Column(TypeName = "text")] public string? Description { get; set; }

    [Required]
    [ExcludeFromUpdate]
    [ForeignKey("Employer")]
    public int EmployerId { get; set; }

    [ExcludeFromUpdate] public Employer Employer { get; set; }
}