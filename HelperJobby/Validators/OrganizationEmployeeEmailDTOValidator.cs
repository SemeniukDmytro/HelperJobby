using FluentValidation;
using HelperJobby.DTOs.Organization;

namespace HelperJobby.Validators;

public class OrganizationEmployeeEmailDTOValidator : AbstractValidator<CreateOrganizationEmployeeEmailDTO>
{
    public static void ValidateEmail(CreateOrganizationEmployeeEmailDTO employeeEmailDTO)
    {
        CommonValidator.BeValidEmail(employeeEmailDTO.Email);
    }
}