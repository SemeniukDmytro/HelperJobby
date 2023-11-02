using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDAL.Entities;

public class PersonSkill
{
    public int Id { get; set; }
    
    [ForeignKey("Resume")]
    public int ResumeId { get; set; }
    
    [Required]
    public Resume Resume { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string Skill { get; set; }
}