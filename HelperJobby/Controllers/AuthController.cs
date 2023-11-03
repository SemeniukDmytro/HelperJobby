using ApplicationCommon.DTOs.User;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController()
        {
            
        }
        
        [HttpPost("sing-up")]
        public async Task<AuthUserDTO> Register([FromBody] RegisterUserDTO newUser)
        {
            return null;
        }
        
        [HttpPost("sign-in")]
        public async Task<AuthUserDTO> Login([FromBody] LoginUserDTO loginUser)
        {
            return null;
        }
    }
    
}
