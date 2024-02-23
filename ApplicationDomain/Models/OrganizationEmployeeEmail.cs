using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class OrganizationEmployeeEmail
{
    public Organization Organization;
    public int Id { get; set; }

    [Required] [MaxLength(50)] public string Email { get; set; }

    [Required]
    [ForeignKey("Organization")]
    public int OrganizationId { get; set; }
}