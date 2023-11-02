using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class JobApply
{
    [ForeignKey("Job")]
    public int JobId { get; set; }

    [ForeignKey("JobSeekerAccount")]
    public int JobSeekerAccountId { get; set; }

    public Job Job { get; set; }

    public JobSeekerAccount JobSeekerAccount { get; set; }

    public DateTime DateTime { get; set; }
    
}