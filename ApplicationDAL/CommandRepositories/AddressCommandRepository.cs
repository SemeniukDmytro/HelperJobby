using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class AddressCommandRepository : IAddressCommandRepository
{
    public Task<Address> CreateAddress(Address address)
    {
        throw new NotImplementedException();
    }

    public Task<Address> UpdateAddress(int addressId, Address updatedAddress)
    {
        throw new NotImplementedException();
    }
}