using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using FluentValidation;
using HelperJobby.DTOs.User;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthUserDTO = HelperJobby.DTOs.User.AuthUserDTO;
using LoginUserDTO = HelperJobby.DTOs.User.LoginUserDTO;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ExtendedBaseController
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IUserQueryRepository _userQueryRepository;
        private readonly IUserCommandRepository _userCommandRepository;
        public AuthController(IUserService userService, IAuthService authService, IMapper mapper, IValidator<CreateUpdateUserDTO> registerUserValidator, IValidator<LoginUserDTO> loginUserValidator, IUserQueryRepository userQueryRepository, IUserCommandRepository userCommandRepository) : base(mapper)
        {
            _userService = userService;
            _authService = authService;
            _userQueryRepository = userQueryRepository;
            _userCommandRepository = userCommandRepository;
        }
        
        [HttpPost("sign-up")]
        public async Task Register([FromBody] CreateUpdateUserDTO newUser)
        {
            CreateUserDTOValidator.ValidateUser(newUser);

            var user = _mapper.Map<User>(newUser);
            
            user = await _userService.CreateUser(user);
            await _userCommandRepository.CreateUser(user);
        }
        
        [HttpPost("sign-in")]
        public async Task<AuthUserDTO> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            LoginUserDTOValidator.ValidateUser(loginUserDTO);
            
            var userEntity = await _userQueryRepository.GetUserByEmail(loginUserDTO.Email);

            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userEntity),
                Token = await _authService.AuthUser(userEntity)
            };
        }
    }
    
}
