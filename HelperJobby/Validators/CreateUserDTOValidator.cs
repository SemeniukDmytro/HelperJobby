using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.User;

namespace HelperJobby.Validators;

public class CreateUserDTOValidator : AbstractValidator<CreateUpdateUserDTO>
{
    public CreateUserDTOValidator()
    {

        RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not have an empty password")
            .Length(8, 25).WithMessage("Length of your Password is invalid");

        RuleFor(u => u.AccountType).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not register without account type specified")
            .Must(CommonValidator.HaveValidAccountType).WithMessage("Chosen role is invalid");
    }

    public static void ValidateUser(CreateUpdateUserDTO user)
    {
        CommonValidator.BeValidEmail(user.Email);
        var validator = new CreateUserDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid)
        {
            throw new InvalidUserException(validationResult.ToString());
        }
    }
    
}