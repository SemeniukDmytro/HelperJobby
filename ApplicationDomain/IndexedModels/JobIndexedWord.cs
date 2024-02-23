using System.ComponentModel.DataAnnotations;

namespace ApplicationDomain.IndexedModels;

public class JobIndexedWord
{
    public int Id { get; set; }

    [Required] [MaxLength(40)] public string Word { get; set; }

    [Required] public int JobCount { get; set; }

    public List<ProcessedJobWord> ProcessedJobWords { get; set; }
}