using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Address;
using HelperJobby.DTOs.User;

namespace HelperJobby.AutoMapperProfiles;

public class JobSeekerAccountProfile : Profile
{
    public JobSeekerAccountProfile()
    {
        CreateMap<JobSeekerAccount, JobSeekerAccountDTO>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<User, UserDTO>(src.User);
            dest.Address = context.Mapper.Map<Address, AddressDTO>(src.Address);
        });
        CreateMap<JobSeekerAccountDTO, JobSeekerAccount>().AfterMap((src, dest, context) =>
        {
            dest.User = context.Mapper.Map<UserDTO, User>(src.User);
            dest.Address = context.Mapper.Map<AddressDTO, Address>(src.Address);
        });
    }
}