using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.User;

namespace HelperJobby.Validators;

public class LoginUserDTOValidator : AbstractValidator<LoginUserDTO>
{
    public LoginUserDTOValidator()
    {
        RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Password can not be empty")
            .Length(8, 25).WithMessage("Length of your password is invalid");
    }

    public static void ValidateUser(LoginUserDTO user)
    {
        CommonValidator.BeValidEmail(user.Email);
        var validator = new LoginUserDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid) throw new InvalidUserException(validationResult.ToString());
    }
}