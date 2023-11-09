using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.User;

namespace HelperJobby.Validators;

public class UpdateUserDTOValidator : AbstractValidator<CreateUpdateUserDTO>
{
    public UpdateUserDTOValidator()
    {
        RuleFor(u => u.Email)
            .Length(4, 50).WithMessage("Length of your Email is invalid").When(u => !string.IsNullOrEmpty(u.Email))
            .Must(CommonValidator.BeValidEmail).WithMessage("Please enter a valid email")
            .When(u => !string.IsNullOrEmpty(u.Email));

        RuleFor(u => u.Password)
            .Length(8, 25).WithMessage("Length of your number is invalid")
            .When(u => !string.IsNullOrEmpty(u.Password));

        RuleFor(u => u.AccountType)
            .Must(CommonValidator.HaveValidAccountType).WithMessage("Chosen role is invalid")
            .When(u => !string.IsNullOrEmpty(u.AccountType));
    }
    
    public static void ValidateUser(CreateUpdateUserDTO user)
    {
        var validator = new UpdateUserDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid)
        {
            throw new InvalidUserException(validationResult.ToString());
        }
    }
}