using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Account;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.AutoMapperProfiles;

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
        CreateMap<CreateResumeDTO, Resume>();
    }
}