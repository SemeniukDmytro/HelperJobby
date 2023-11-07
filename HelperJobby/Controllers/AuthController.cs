using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using HelperJobby.DTOs.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthUserDTO = HelperJobby.DTOs.User.AuthUserDTO;
using LoginUserDTO = HelperJobby.DTOs.User.LoginUserDTO;
using RegisterUserDTO = HelperJobby.DTOs.User.RegisterUserDTO;

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
        private readonly IValidator<RegisterUserDTO> _registerUserValidator;
        private readonly IValidator<LoginUserDTO> _loginUserValidator;
        public AuthController(IUserService userService, IAuthService authService, IMapper mapper, IValidator<RegisterUserDTO> registerUserValidator, IValidator<LoginUserDTO> loginUserValidator, IUserQueryRepository userQueryRepository) : base(mapper)
        {
            _userService = userService;
            _authService = authService;
            _registerUserValidator = registerUserValidator;
            _loginUserValidator = loginUserValidator;
            _userQueryRepository = userQueryRepository;
        }
        
        [HttpPost("sign-up")]
        public async Task Register([FromBody] RegisterUserDTO newUser)
        {
            ValidationResult validationResult = await _registerUserValidator.ValidateAsync(newUser);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors[0].ErrorMessage);
            }

            var user = _mapper.Map<User>(newUser);
            
            await _userService.CreateUser(user);
        }
        
        [HttpPost("sign-in")]
        public async Task<AuthUserDTO> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            ValidationResult validationResult = await _loginUserValidator.ValidateAsync(loginUserDTO);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors[0].ErrorMessage);
            }
            
            var userEntity = await _userQueryRepository.GetUserByEmail(loginUserDTO.Email);

            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userEntity),
                Token = await _authService.AuthUser(userEntity)
            };
        }
    }
    
}
