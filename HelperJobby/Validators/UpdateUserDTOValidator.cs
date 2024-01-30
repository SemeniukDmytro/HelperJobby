using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.User;

namespace HelperJobby.Validators;

public class UpdateUserDTOValidator : AbstractValidator<CreateUpdateUserDTO>
{
    public UpdateUserDTOValidator()
    {
        RuleFor(u => u.Password)
            .Length(8, 25).WithMessage("Length of your password is invalid")
            .When(u => !string.IsNullOrEmpty(u.Password));

        RuleFor(u => u.AccountType)
            .Must(CommonValidator.HaveValidAccountType).WithMessage("Chosen role is invalid")
            .When(u => !string.IsNullOrEmpty(u.AccountType));
    }

    public static void ValidateUser(CreateUpdateUserDTO user)
    {
        if (!string.IsNullOrEmpty(user.Email)) CommonValidator.BeValidEmail(user.Email);
        var validator = new UpdateUserDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid) throw new InvalidUserException(validationResult.ToString());
    }
}