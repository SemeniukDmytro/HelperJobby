using ApplicationBLL.QueryRepositories;
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
        private readonly UserQueryRepository _userQueryRepository;
        
        public UserController(UserQueryRepository userQueryRepository)
        {
            _userQueryRepository = userQueryRepository;
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> GetUser(int id)
        {
            return await _userQueryRepository.GetUserById(id);
        }
        
        [HttpGet("current-user")]
        public async Task<UserDTO> GetUser()
        {
            return await _userQueryRepository.GetUserById(_userQueryRepository.GetCurrentUserId());
        }

        [HttpPut("{id}")]
        public async Task<UserDTO> PutUser(int id, [FromBody] UserDTO value)
        {
            return null;
        }
    }
}
