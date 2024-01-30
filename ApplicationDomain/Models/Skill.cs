using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class Skill
{
    public int Id { get; set; }

    [Required] [ForeignKey("Resume")] public int ResumeId { get; set; }

    public Resume Resume { get; set; }

    [Required] [MaxLength(30)] public string Name { get; set; }
}