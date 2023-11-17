using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.Validators;

public class CreateResumeValidator : AbstractValidator<CreateResumeDTO>
{
    CreateResumeValidator()
    {
        RuleFor(r => r.Educations).NotEmpty()
            .When(r => r.WorkExperiences.Count == 0).WithMessage("You didn't provide enough information to create resume");
        RuleFor(r => r.WorkExperiences).NotEmpty()
            .When(r => r.Educations.Count == 0).WithMessage("You didn't provide enough information to create resume");
    }
    
    public static void ValidateCreatedResume(CreateResumeDTO resume)
    {
        var validator = new CreateResumeValidator();
        var validationResult = validator.Validate(resume);
        
        if (!validationResult.IsValid)
        {
            throw new InvalidResumeException(validationResult.ToString());
        }

        resume.Educations.ForEach(CreateEducationDTOValidator.ValidateCreatedEducation);
        resume.WorkExperiences.ForEach(CreateWorkExperienceDTOValidator.ValidateCreatedWorkExperience);
        resume.Skills.ForEach(CreateSkillDTOValidator.ValidateCreatedSkill);
    }
}