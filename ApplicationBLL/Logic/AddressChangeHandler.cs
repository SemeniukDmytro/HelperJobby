using ApplicationBLL.Interfaces;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;

namespace ApplicationBLL.Logic;

public class AddressChangeHandler : IAddressChangeHandler
{
    private readonly IAddressCommandRepository _addressCommandRepository;

    public AddressChangeHandler(IAddressCommandRepository addressCommandRepository)
    {
        _addressCommandRepository = addressCommandRepository;
    }

    public async Task<Address> ChangeAddress(Address oldAddress, Address updatedAddress)
    {
        return updatedAddress;
    }
}