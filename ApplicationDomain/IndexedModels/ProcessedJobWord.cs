using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Models;

namespace ApplicationDomain.IndexedModels;

public class ProcessedJobWord
{
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "decimal(6,2)")]
    public decimal Rating { get; set; }

    [Required] [ForeignKey("Job")] public int JobId { get; set; }

    public Job Job { get; set; }

    [Required]
    [ForeignKey("JobIndexedWord")]
    public int JobIndexedWordId { get; set; }

    public JobIndexedWord JobIndexedWord { get; set; }
}