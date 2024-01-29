using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Resume;

namespace HelperJobby.Validators;

public class CreateUpdateWorkExperienceDTOValidator : AbstractValidator<CreateUpdateWorkExperienceDTO>
{
    public CreateUpdateWorkExperienceDTOValidator()
    {
        RuleFor(we => we.JobTitle).Cascade(FluentValidation.CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not provide an empty job title")
            .MaximumLength(100).WithMessage("Maximum length of job title field exceeded");
    }
    
    public static void ValidateCreatedWorkExperience(CreateUpdateWorkExperienceDTO updateWorkExperience)
    {
        var validator = new CreateUpdateWorkExperienceDTOValidator();
        var validationResult = validator.Validate(updateWorkExperience);

        if (!validationResult.IsValid)
        {
            throw new InvalidWorkExperienceException(validationResult.ToString());
        }
    }
}