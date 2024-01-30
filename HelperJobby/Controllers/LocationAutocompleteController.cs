using ApplicationDomain.Abstraction.IServices;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LocationAutocompleteController : ControllerBase
{
    private readonly ILocationService _locationService;

    public LocationAutocompleteController(ILocationService locationService)
    {
        _locationService = locationService;
    }

    [HttpGet]
    [Route("street_addresses")]
    public async Task<List<string>> GetAutocompletesForStreetAddress(
        [FromQuery] string input,
        [FromQuery] string countryA2code)
    {
        return await _locationService.GetStreetAddressAutocomplete(input, countryA2code);
    }

    [HttpGet]
    [Route("cities")]
    public async Task<List<string>> GetAutocompletesForCity(
        [FromQuery] string input,
        [FromQuery] string countryA2code)
    {
        return await _locationService.GetCityAutocomplete(input, countryA2code);
    }

    [HttpGet]
    [Route("job-location")]
    public async Task<List<string>> GetAutocompletesForJobLocation(
        [FromQuery] string input)
    {
        return await _locationService.GetJobLocationAutocomplete(input);
    }
}