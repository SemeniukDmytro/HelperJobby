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
        CreateMap<CreateUpdateSalaryDTO, IncompleteJobSalary>();
        CreateMap<IncompleteJobSalary, IncompleteJobSalaryDTO>().AfterMap((src, dest, opt) =>
        {
            dest.IncompleteJob = opt.Mapper.Map<IncompleteJob, IncompleteJobDTO>(src.IncompleteJob);
            dest.SalaryRate = EnumToStringConverter.JobSalaryRateConverter(src.SalaryRate);
        });
        CreateMap<JobSalary, JobSalaryDTO>().AfterMap((src, dest, opt) =>
        {
            dest.Job = opt.Mapper.Map<Job, JobDTO>(src.Job);
            dest.SalaryRate = EnumToStringConverter.JobSalaryRateConverter(src.SalaryRate);
        });
        CreateMap<IncompleteJobSalary, JobSalary>().ReverseMap();
    }
}