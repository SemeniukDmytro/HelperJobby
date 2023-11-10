using System.Text.RegularExpressions;
using FluentValidation;

namespace HelperJobby.Validators;

public class CommonValidator
{
    internal static void BeValidEmail(string email)
    {
        if (String.IsNullOrEmpty(email))
        {
            throw new ValidationException("You can not have an empty email");
        }

        if (email.Length < 4 || email.Length > 50)
        {
            throw new ValidationException("Length of your Email is invalid");
        }
        int atSymbolIndex = email.LastIndexOf('@');
        if (!(atSymbolIndex >= 0 && email.LastIndexOf('.') >= atSymbolIndex && atSymbolIndex == email.IndexOf('@') &&
              email.Length - atSymbolIndex > 4))
        {
            throw new ValidationException("Please enter a valid email");
        }
    }
    
    internal static bool HaveValidAccountType(string accountType)
    {
        return accountType == "Job seeker" || accountType == "Employer";
    }

    internal static void BeValidPhoneNumber(string phoneNumber)
    {
        if (String.IsNullOrEmpty(phoneNumber))
        {
            throw new ValidationException("You can not have an empty phoneNumber");
        }

        if (phoneNumber.Length < 5 || phoneNumber.Length > 15)
        {
            throw new ValidationException("Length of your phone number is invalid");
        }
        
        string regexPattern = @"^\+[1-9]{1,3}[0-9]{3,14}$";
        if (!Regex.IsMatch(phoneNumber, regexPattern))
        {
            throw new ValidationException("Please enter a valid phone number");
        }
    }
}