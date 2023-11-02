using System.ComponentModel.DataAnnotations;

namespace ApplicationDAL.Entities;

public class Address
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(45)]
    public string Country { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string StreetAddress { get; set; }
    
    [Required]
    [MaxLength(30)]
    public string City { get; set; }
    
    [Required]
    [MaxLength(10)]
    public string PostalCode { get; set; }
}