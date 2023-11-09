using System.Text.RegularExpressions;

namespace HelperJobby.Validators;

public class CommonValidator
{
    internal static bool BeValidEmail(string email)
    {
        int atSymbolIndex = email.LastIndexOf('@');
        return atSymbolIndex >= 0 && email.LastIndexOf('.') >= atSymbolIndex && atSymbolIndex == email.IndexOf('@') &&
               email.Length - atSymbolIndex > 4;
    }
    
    internal static bool HaveValidAccountType(string accountType)
    {
        return accountType == "Job seeker" || accountType == "Employer";
    }

    internal static bool BeValidPhoneNumber(string phoneNumber)
    {
        string regexPattern = @"^\+[1-9]{1,3}[0-9]{3,14}$";
        return Regex.IsMatch(phoneNumber, regexPattern);
    }
}