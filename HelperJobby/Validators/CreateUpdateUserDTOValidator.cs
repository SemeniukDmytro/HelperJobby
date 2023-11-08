using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.User;

namespace HelperJobby.Validators;

public class CreateUpdateUserDTOValidator : AbstractValidator<CreateUpdateUserDTO>
{
    public CreateUpdateUserDTOValidator()
    {
        RuleFor(u => u.Email).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not have an empty email")
            .Length(4, 50).WithMessage("Length of your Email is invalid")
            .Must(BeValidEmail).WithMessage("Please enter a valid email");

        RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not have an empty email")
            .Length(8, 25).WithMessage("Length of your Password is invalid");

        RuleFor(u => u.AccountType).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not register without account type specified")
            .Must(HaveValidAccountType).WithMessage("Chosen role is invalid");
    }

    public static void ValidateUser(CreateUpdateUserDTO user)
    {
        var validator = new CreateUpdateUserDTOValidator();
        var validationResult = validator.Validate(user);

        if (!validationResult.IsValid)
        {
            throw new InvalidUserException(validationResult.ToString());
        }
    }
    
    private bool BeValidEmail(string email)
    {
        int atSymbolIndex = email.LastIndexOf('@');
        return atSymbolIndex >= 0 && email.LastIndexOf('.') >= atSymbolIndex && atSymbolIndex == email.IndexOf('@') &&
               email.Length - atSymbolIndex >= 4;
    }

    private bool HaveValidAccountType(string accountType)
    {
        return accountType == "Job seeker" || accountType == "Employer";
    }
}