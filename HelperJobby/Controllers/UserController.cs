using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.User;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ExtendedBaseController
    {
        private readonly IUserQueryRepository _userQueryRepository;
        private readonly IUserCommandRepository _userCommandRepository;
        private readonly IUserService _userService;
        
        public UserController(IUserQueryRepository userQueryRepository, IMapper mapper, IUserService userService, IUserCommandRepository userCommandRepository) : base(mapper)
        {
            _userQueryRepository = userQueryRepository;
            _userService = userService;
            _userCommandRepository = userCommandRepository;
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> GetUser(int id)
        {
            var user = await _userQueryRepository.GetUser(id, q => q.Include(u => u.EmployerAccount) 
                .Include(u => u.JobSeekerAccount));
            var userDTO = _mapper.Map<UserDTO>(user);
            
            return userDTO;
        }
        
        [HttpGet("current-user")]
        public async Task<UserDTO> GetUser()
        {
            var user = await _userQueryRepository.GetUser(_userService.GetCurrentUserId(), q => q.Include(u => u.EmployerAccount) 
                .Include(u => u.JobSeekerAccount));
            var userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }

        [HttpPut("{id}")]
        public async Task<UserDTO> PutUser(int id, [FromBody] CreateUpdateUserDTO updatedUserDTO)
        {
            UpdateUserDTOValidator.ValidateUser(updatedUserDTO);
            var updatedUserModel = await _userService.UpdateUser(id,_mapper.Map<User>(updatedUserDTO));
            updatedUserModel = await _userCommandRepository.UpdateUser(updatedUserModel);
            return _mapper.Map<UserDTO>(updatedUserModel);
        }
    }
}
