using ApplicationDomain.Abstraction.IServices;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleMapsController : ControllerBase
    {
        private const string GoogleMapsApiUrl = "https://maps.googleapis.com/maps/api/";
        private readonly ILocationService _locationService;

        public GoogleMapsController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        [Route("autocomplete/street_addresses")]
        public async Task<List<string>> GetAutocompletesForStreetAddress(
            [FromQuery] string input,
            [FromQuery] string countryCode)
        {
            return await _locationService.GetStreetAddressAutocomplete(input, countryCode);
        }
        
        [HttpGet]
        [Route("autocomplete/street_addresses")]
        public async Task<List<string>> GetAutocompletesForCity(
            [FromQuery] string input,
            [FromQuery] string countryCode)
        {
            return await _locationService.GetCityAutocomplete(input, countryCode);
        }
    }

    

    
    
}