using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class JobApply
{
    [Key, Column(Order = 0)]
    [ForeignKey("Job")]
    public int JobId { get; set; }
    
    [Key, Column(Order = 1)]
    [ForeignKey("JobSeekerAccount")]
    public int JobSeekerAccountId { get; set; }

    public Job Job { get; set; }

    public JobSeekerAccount JobSeekerAccount { get; set; }

    public DateTime DateTime { get; set; }
    
}