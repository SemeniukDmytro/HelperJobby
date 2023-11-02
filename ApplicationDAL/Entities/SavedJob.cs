using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class SavedJob
{
    [ForeignKey("Job")]
    public int JobId { get; set; }
    
    [ForeignKey("JobSeekerAccount")]
    public int JobSeekerAccountId { get; set; }
    
    public Job Job { get; set; }
    
    public JobSeekerAccount JobSeekerAccount { get; set; }
}