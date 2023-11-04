using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.Address;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

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