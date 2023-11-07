using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class Education
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string LevelOfEducation { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string FieldOfStudy { get; set; }
    
    [Required]
    [MaxLength(70)]
    public string SchoolName { get; set; }
    
    [Required]
    [MaxLength(45)]
    public string Country { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string City { get; set; }
    
    [Required]
    public DateOnly From { get; set; }
    
    [Required]
    public DateOnly To { get; set; }
    
    [ForeignKey("Resume")]
    public int ResumeId { get; set; }
    
    [Required]
    public Resume Resume { get; set; }
}