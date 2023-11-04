using ApplicationBLL.Services;
using ApplicationCommon.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private UserService _userService;
        private AuthService _authService;

        public AuthController(UserService userService, AuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }
        
        [HttpPost("sign-up")]
        public async Task Register([FromBody] RegisterUserDTO newUser)
        {
            await _userService.CreateUser(newUser);
        }
        
        [HttpPost("sign-in")]
        public async Task<AuthUserDTO> Login([FromBody] LoginUserDTO loginUser)
        {
            return await _authService.AuthUser(loginUser);
        }
    }
    
}
