using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.AutoMapperProfiles;

public class EducationProfile : Profile
{
    public EducationProfile()
    {
        CreateMap<Education, EducationDTO>().AfterMap((src, dest, context) =>
        {
            dest.Resume = context.Mapper.Map<Resume, ResumeDTO>(src.Resume);
        });
        CreateMap<EducationDTO, Education>().AfterMap((src, dest, context) =>
        {
            dest.Resume = context.Mapper.Map<ResumeDTO, Resume>(src.Resume);
        });
    }
}