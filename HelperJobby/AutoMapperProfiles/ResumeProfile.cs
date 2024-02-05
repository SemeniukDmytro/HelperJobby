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
            dest.JobSeeker = context.Mapper.Map<JobSeeker, JobSeekerDTO>(src.JobSeeker);
        });

        CreateMap<ResumeDTO, Resume>().AfterMap((src, dest, context) =>
        {
            dest.JobSeeker = context.Mapper.Map<JobSeekerDTO, JobSeeker>(src.JobSeeker);
        });
        CreateMap<CreateResumeDTO, Resume>();
    }
}