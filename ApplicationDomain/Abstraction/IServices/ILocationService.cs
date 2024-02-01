namespace ApplicationDomain.Abstraction.IServices;

public interface ILocationService
{
    public Task<List<string>> GetAddressAutocomplete(string input, string countryCode);

    public Task<List<string>> GetCityAutocomplete(string input, string countryCode);
    public Task<List<string>> GetJobLocationAutocomplete(string input);
}