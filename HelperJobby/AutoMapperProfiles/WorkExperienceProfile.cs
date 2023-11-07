using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.AutoMapperProfiles;

public class WorkExperienceProfile : Profile
{
    public WorkExperienceProfile()
    {
        CreateMap<WorkExperience, WorkExperienceDTO>().AfterMap((src, dest, context) =>
        {
            dest.Resume = context.Mapper.Map<Resume, ResumeDTO>(src.Resume);
        });
        CreateMap<WorkExperienceDTO, WorkExperience>().AfterMap((src, dest, context) =>
        {
            dest.Resume = context.Mapper.Map<ResumeDTO, Resume>(src.Resume);
        });
    }
}