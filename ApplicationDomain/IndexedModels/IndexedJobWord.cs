using System.ComponentModel.DataAnnotations;

namespace ApplicationDomain.IndexedModels;

public class IndexedJobWord
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(40)]
    public string Word { get; set; }

    public List<ProcessedJobWord> ProcessedJobWords { get; set; }
}