using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class SavedJob
{
    [Key]
    [Column(Order = 0)]
    [ForeignKey("Job")]
    public int JobId { get; set; }

    [Key]
    [Column(Order = 1)]
    [ForeignKey("JobSeeker")]
    public int JobSeekerId { get; set; }

    public Job Job { get; set; }

    public JobSeeker JobSeeker { get; set; }

    [Required] public DateOnly DateSaved { get; set; }
}