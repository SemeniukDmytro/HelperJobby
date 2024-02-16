using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationDomain.Models;

public class Organization
{
    public int Id { get; set; }

    [Required] [MaxLength(100)] public string Name { get; set; }

    [MaxLength(15)] public string PhoneNumber { get; set; }

    public int? NumberOfEmployees { get; set; }

    public List<OrganizationEmployeeEmail> EmployeeEmails { get; set; }
    public List<Employer> Employees { get; set; }
}