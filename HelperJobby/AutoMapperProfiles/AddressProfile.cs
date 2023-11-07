using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Address;

namespace HelperJobby.AutoMapperProfiles;

public class AddressProfile : Profile
{
    public AddressProfile()
    {
        CreateMap<Address, AddressDTO>().ReverseMap();
    }
}