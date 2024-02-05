using ApplicationBLL.Logic;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;

namespace HelperJobby.AutoMapperProfiles;

public class SalaryProfile : Profile
{
    public SalaryProfile()
    {
        CreateMap<CreateUpdateSalaryDTO, JobSalary>();
        CreateMap<CreateUpdateSalaryDTO, CurrentJobSalary>();
        CreateMap<CurrentJobSalary, CurrentJobSalaryDTO>().AfterMap((src, dest, opt) =>
        {
            dest.CurrentJob = opt.Mapper.Map<CurrentJobCreation, CurrentJobCreationDTO>(src.CurrentJob);
            dest.SalaryRate = EnumToStringConverter.JobSalaryRateConverter(src.SalaryRate);
        });
        CreateMap<JobSalary, JobSalaryDTO>().AfterMap((src, dest, opt) =>
        {
            dest.Job = opt.Mapper.Map<Job, JobDTO>(src.Job);
            dest.SalaryRate = EnumToStringConverter.JobSalaryRateConverter(src.SalaryRate);
        });
        CreateMap<CurrentJobSalary, JobSalary>().ReverseMap();
    }
}