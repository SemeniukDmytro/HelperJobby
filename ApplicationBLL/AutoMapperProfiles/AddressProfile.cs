using ApplicationCommon.DTOs.Address;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class AddressProfile : Profile
{
    public AddressProfile()
    {
        CreateMap<Address, AddressDTO>().ReverseMap();
    }
}