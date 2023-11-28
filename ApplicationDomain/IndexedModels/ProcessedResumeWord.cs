using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Enums;

namespace ApplicationDomain.IndexedModels;

public class ProcessedResumeWord
{
    public int Id { get; set; }
    
    [Required]
    public int WordCount { get; set; }
    
    [Required]
    [ForeignKey("IndexedResumeWord")]
    public int IndexedResumeWordId { get; set; }
    
    public IndexedResumeWord IndexedResumeWord { get; set; }
}