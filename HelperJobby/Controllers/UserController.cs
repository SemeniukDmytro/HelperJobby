using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using AutoMapper;
using HelperJobby.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ExtendedBaseController
    {
        private readonly IUserQueryRepository _userQueryRepository;
        private readonly IUserService _userService;
        
        public UserController(IUserQueryRepository userQueryRepository, IMapper mapper, IUserService userService) : base(mapper)
        {
            _userQueryRepository = userQueryRepository;
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> GetUser(int id)
        {
            var user = await _userQueryRepository.GetUserById(id);
            var userDTO = _mapper.Map<UserDTO>(user);
            
            return userDTO;
        }
        
        [HttpGet("current-user")]
        public async Task<UserDTO> GetUser()
        {
            var user = await _userQueryRepository.GetUserById(_userService.GetCurrentUserId());
            var userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }

        [HttpPut("{id}")]
        public async Task<UserDTO> PutUser(int id, [FromBody] UserDTO value)
        {
            return null;
        }
    }
}
