using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Address;
using HelperJobby.DTOs.User;

namespace HelperJobby.AutoMapperProfiles;

public class JobSeekerProfile : Profile
{
    public JobSeekerProfile()
    {
        CreateMap<JobSeeker, JobSeekerDTO>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<User, UserDTO>(src.User);
            dest.Address = context.Mapper.Map<Address, AddressDTO>(src.Address);
        });
        CreateMap<JobSeekerDTO, JobSeeker>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<UserDTO, User>(src.User);
            dest.Address = context.Mapper.Map<AddressDTO, Address>(src.Address);
        });
        CreateMap<UpdatedJobSeekerDTO, JobSeeker>().AfterMap((src, dest, context) =>
        {
            dest.Address = context.Mapper.Map<UpdateAddressDTO, Address>(src.Address);
        });
    }
}