using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;
using JobSeekerAccountDTO = HelperJobby.DTOs.Account.JobSeekerAccountDTO;
using ResumeDTO = HelperJobby.DTOs.Resume.ResumeDTO;

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