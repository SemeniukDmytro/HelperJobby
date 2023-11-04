using ApplicationCommon.DTOs.Account;
using ApplicationCommon.DTOs.Job;
using ApplicationCommon.DTOs.Resume;
using ApplicationDAL.Entities;
using AutoMapper;

namespace ApplicationBLL.AutoMapperProfiles;

public class ResumeProfile : Profile
{
    public ResumeProfile()
    {
        CreateMap<Resume, ResumeDTO>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccount, JobSeekerAccountDTO>(src.JobSeekerAccount);
        });
        
        CreateMap<ResumeDTO, Resume>().AfterMap((src, dest, context) =>
        {
            dest.JobSeekerAccount = context.Mapper.Map<JobSeekerAccountDTO, JobSeekerAccount>(src.JobSeekerAccount);
        });
    }
}