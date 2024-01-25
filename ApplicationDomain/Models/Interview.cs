using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class Interview
{
    [Key, Column(Order = 0)]
    [ForeignKey("Job")]
    public int JobId { get; set; }
    
    [Key, Column(Order = 1)]
    [ForeignKey("JobSeekerAccount")]
    public int JobSeekerAccountId { get; set; }
    
    public Job Job { get; set; }
    
    public JobSeekerAccount JobSeekerAccount { get; set; }
    [Required]
    public DateOnly InterviewDate { get; set; }
}