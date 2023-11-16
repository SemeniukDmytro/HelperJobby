using ApplicationDomain.Models;

namespace ApplicationBLL.Interfaces;

public interface IAddressChangeHandler
{
    public Task<Address> ChangeAddress(Address oldAddress, Address updatedAddress);
}