using System.ComponentModel.DataAnnotations;

namespace ApplicationDomain.IndexedModels;

public class IndexedResumeWord
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(40)]
    public string Word { get; set; }

    public List<ProcessedResumeWord> ProcessedResumeWords { get; set; }
}