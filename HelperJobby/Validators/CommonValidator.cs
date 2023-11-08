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
}