using FluentValidation;
using HelperJobby.DTOs.Organization;

namespace HelperJobby.Validators;

public class OrganizationEmployeeEmailDTOValidator : AbstractValidator<OrganizationEmployeeEmailDTO>
{
    public OrganizationEmployeeEmailDTOValidator()
    {
        
    }

    public static void ValidateEmail(OrganizationEmployeeEmailDTO employeeEmailDTO)
    {
        CommonValidator.BeValidEmail(employeeEmailDTO.Email);
    }
}

