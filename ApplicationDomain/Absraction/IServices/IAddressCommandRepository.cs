using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IServices;

public interface IAddressCommandRepository
{
    public Task<Address> CreateAddress(Address address);
    public Task<Address> UpdateAddress(int addressId, Address updatedAddress);
}