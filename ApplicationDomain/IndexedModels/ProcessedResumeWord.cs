using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Enums;
using ApplicationDomain.Models;

namespace ApplicationDomain.IndexedModels;

public class ProcessedResumeWord
{
    public int Id { get; set; }
    
    [Required]
    public int WordCount { get; set; }
    
    [Required]
    [ForeignKey("ResumeIndexedWord")]
    public int ResumeIndexedWordId { get; set; }
    
    public ResumeIndexedWord ResumeIndexedWord { get; set; }
    
    [Required]
    [ForeignKey("Resume")]
    public int ResumeId { get; set; }

    public Resume Resume { get; set; }
    
}