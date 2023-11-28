using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ApplicationDomain.Enums;

namespace ApplicationDomain.IndexedModels;

public class ProcessedJobWord
{
    public int Id { get; set; }
    
    [Required]
    public int WordCount { get; set; }
    
    [Required]
    public JobWordOccurrences JobWordOccurrences { get; set; }
    
    [Required]
    [ForeignKey("IndexedJpbWord")]
    public int IndexedJobWordId { get; set; }
    
    public IndexedJobWord IndexedJobWord { get; set; }
}