using ApplicationDomain.Exceptions;
using FluentValidation;
using HelperJobby.DTOs.Account;

namespace HelperJobby.Validators;

public class UpdateJobSeekerAccountDTOValidator : AbstractValidator<UpdatedJobSeekerAccountDTO>
{
    public UpdateJobSeekerAccountDTOValidator()
    {
        RuleFor(a => a.FirstName).Cascade(CascadeMode.Stop)
            .MaximumLength(30).WithMessage("Invalid length of first name");
        RuleFor(a => a.LastName).Cascade(CascadeMode.Stop)
            .MaximumLength(30).WithMessage("Invalid length of last name");
        RuleFor(a => a.Address.Country).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Country field can not be empty")
            .MaximumLength(45).WithMessage("Invalid length of country field").When(a => a.Address != null);
        RuleFor(a => a.Address.City).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("City field can not be empty")
            .MaximumLength(30).WithMessage("Invalid length of city field").When(a => a.Address != null);
    }
    
    public static void ValidateAccount(UpdatedJobSeekerAccountDTO account)
    {

        if (!string.IsNullOrEmpty(account.PhoneNumber))
        {
            CommonValidator.BeValidPhoneNumber(account.PhoneNumber);
        }
        var validator = new UpdateJobSeekerAccountDTOValidator();
        var validationResult = validator.Validate(account);

        if (!validationResult.IsValid)
        {
            throw new InvalidJobSeekerAccountUpdateException(validationResult.ToString());
        }
    }
}