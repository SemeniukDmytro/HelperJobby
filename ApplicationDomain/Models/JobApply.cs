using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class JobApply
{
    [Key]
    [Column(Order = 0)]
    [ForeignKey("Job")]
    public int JobId { get; set; }

    [Key]
    [Column(Order = 1)]
    [ForeignKey("JobSeeker")]
    public int JobSeekerId { get; set; }
    
    [Required]
    [DefaultValue(JobApplyStatuses.NotSpecified)]
    public JobApplyStatuses JobApplyStatus { get; set; }
    [Required]
    [DefaultValue(false)]
    public bool IsReviewed { get; set; }
    public Job Job { get; set; }

    public JobSeeker JobSeeker { get; set; }

    [Required] public DateOnly DateApplied { get; set; }
}