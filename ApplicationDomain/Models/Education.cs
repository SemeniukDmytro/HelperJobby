using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class Education
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string LevelOfEducation { get; set; }
    
    [MaxLength(30)]
    public string? FieldOfStudy { get; set; }
    
    [MaxLength(70)]
    public string? SchoolName { get; set; }
    
    [MaxLength(45)]
    public string? Country { get; set; }
    
    [MaxLength(30)]
    public string? City { get; set; }
    
    [Required]
    public DateOnly? From { get; set; }
    
    [Required]
    public DateOnly? To { get; set; }
    
    [Required]
    [ForeignKey("Resume")]
    public int ResumeId { get; set; }
    
    public Resume Resume { get; set; }
}