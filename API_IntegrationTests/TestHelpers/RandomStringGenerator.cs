using System.Text;

namespace API_IntegrationTests.TestHelpers;

public class RandomStringGenerator
{
    private static Random random = new Random();

    public static string GenerateRandomEmail()
    {
        string localPart = GenerateRandomString(10); 
        string domain = "@testdomain.com";
        return localPart + domain;
    }
    
    public static string GeneratePhoneNumber()
    {
        int countryCode = random.Next(1, 1000);
        int phoneNumber = random.Next(1000, 999999999);

        string phoneNumberString = $"+{countryCode:D3}{phoneNumber:D9}";
        return phoneNumberString;
    }
    public static string GenerateRandomString(int length)
    {
        const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var stringChars = new char[length];
        for (int i = 0; i < length; i++)
        {
            stringChars[i] = chars[random.Next(chars.Length)];
        }
        return new String(stringChars);
    }
}