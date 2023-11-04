using ApplicationCommon.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        public UserController()
        {
            
        }

        [HttpPut("{id}")]
        public async Task<UserDTO> PutUser(int id, [FromBody] UserDTO value)
        {
            return null;
        }
    }
}
