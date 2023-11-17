using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.Validators;

public class CreateWorkExperienceDTOValidator : AbstractValidator<CreateWorkExperienceDTO>
{
    public CreateWorkExperienceDTOValidator()
    {
        RuleFor(we => we.JobTitle).Cascade(FluentValidation.CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not provide an empty job title")
            .MaximumLength(30).WithMessage("Maximum length of job title field exceeded");
    }
    
    public static void ValidateCreatedWorkExperience(CreateWorkExperienceDTO workExperience)
    {
        var validator = new CreateWorkExperienceDTOValidator();
        var validationResult = validator.Validate(workExperience);

        if (!validationResult.IsValid)
        {
            throw new InvalidWorkExperienceException(validationResult.ToString());
        }
    }
}