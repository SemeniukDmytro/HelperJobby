using System.ComponentModel.DataAnnotations;

namespace ApplicationDomain.IndexedModels;

public class ResumeIndexedWord
{
    public int Id { get; set; }

    [Required] [MaxLength(40)] public string Word { get; set; }

    [Required] public int ResumesCount { get; set; }

    public List<ProcessedResumeWord> ProcessedResumeWords { get; set; }
}