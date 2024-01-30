using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Models;

namespace ApplicationDomain.IndexedModels;

public class ProcessedResumeWord
{
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "decimal(6,2)")]
    public decimal Rating { get; set; }

    [Required]
    [ForeignKey("ResumeIndexedWord")]
    public int ResumeIndexedWordId { get; set; }

    public ResumeIndexedWord ResumeIndexedWord { get; set; }

    [Required] [ForeignKey("Resume")] public int ResumeId { get; set; }

    public Resume Resume { get; set; }
}