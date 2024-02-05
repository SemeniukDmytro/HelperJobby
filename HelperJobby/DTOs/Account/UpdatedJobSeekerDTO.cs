using HelperJobby.DTOs.Address;

namespace HelperJobby.DTOs.Account;

public class UpdatedJobSeekerDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public UpdateAddressDTO? Address { get; set; }
}