namespace API_IntegrationTests.TestHelpers;

public class RandomStringGenerator
{
    private static readonly Random random = new();

    public static string GenerateRandomEmail()
    {
        var localPart = GenerateRandomString(10);
        var domain = "@testdomain.com";
        return localPart + domain;
    }

    public static string GeneratePhoneNumber()
    {
        var countryCode = random.Next(1, 1000);
        var phoneNumber = random.Next(1000, 999999999);

        var phoneNumberString = $"+{countryCode:D3}{phoneNumber:D9}";
        return phoneNumberString;
    }

    public static string GenerateRandomString(int length)
    {
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var stringChars = new char[length];
        for (var i = 0; i < length; i++) stringChars[i] = chars[random.Next(chars.Length)];
        return new string(stringChars);
    }
}