namespace ApplicationDomain.Abstraction.IServices;

public interface ILocationService
{
    public Task<List<string>> GetStreetAddressAutocomplete(string input, string countryCode);

    public Task<List<string>> GetCityAutocomplete(string input, string countryCode);
}