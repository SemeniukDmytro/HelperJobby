using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.User;

namespace HelperJobby.Validators;

public class LoginUserDTOValidator : AbstractValidator<LoginUserDTO>
{
    public LoginUserDTOValidator()
    {
        RuleFor(u => u.Email).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("You can not have an empty email")
            .Length(4, 50).WithMessage("Length of your Email is invalid")
            .Must(BeValidEmail).WithMessage("Please enter a valid email");
        
        RuleFor(u => u.Password).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Password can not be empty")
            .Length(8, 25).WithMessage("Length of your password is invalid");
    }
    
    public static void ValidateUser(LoginUserDTO user)
    {
        var validator = new LoginUserDTOValidator();
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
               email.Length - atSymbolIndex > 4;
    }
}