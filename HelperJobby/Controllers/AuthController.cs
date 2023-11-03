using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDAL.Entities;
using Microsoft.AspNetCore.Http;
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
        public async Task<User> Register([FromBody] User newUser)
        {
            return null;
        }
        
        [HttpPost("sign-in")]
        public async Task<User> Login([FromBody] User loginUser)
        {
            return null;
        }
    }
    
}
