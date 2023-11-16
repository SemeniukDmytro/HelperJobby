using ApplicationBLL.Interfaces;
using ApplicationDomain.Models;

namespace ApplicationBLL.Logic;

public class AddressChangeHandler : IAddressChangeHandler
{
    public Task<Address> ChangeAddress(Address oldAddress, Address updatedAddress)
    {
        throw new NotImplementedException();
    }
}