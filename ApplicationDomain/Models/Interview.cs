using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Enums;

namespace ApplicationDomain.Models;

public class Interview
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

    [Required] public DateTime InterviewStart { get; set; }

    [Required] public TimeOnly InterviewEnd { get; set; }

    [Required] public InterviewTypes InterviewType { get; set; }

    [Required] [MaxLength(200)] public string AppointmentInfo { get; set; }
}