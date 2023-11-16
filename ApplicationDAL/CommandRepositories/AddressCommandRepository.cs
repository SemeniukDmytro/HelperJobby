using ApplicationDAL.Context;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationDAL.CommandRepositories;

public class AddressCommandRepository : IAddressCommandRepository
{
    private readonly ApplicationContext _applicationContext;

    public AddressCommandRepository(ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
    }

    public async Task<Address> CreateAddress(Address address)
    {
        _applicationContext.Addresses.Add(address);
        await _applicationContext.SaveChangesAsync();
        return address;
    }

    public Task<Address> UpdateAddress(int addressId, Address updatedAddress)
    {
        throw new NotImplementedException();
    }
}