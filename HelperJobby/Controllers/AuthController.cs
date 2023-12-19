using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.Models;
using AutoMapper;
using FluentValidation;
using HelperJobby.DTOs.AuthModels;
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
        public AuthController(IUserService userService, IAuthService authService, IMapper mapper,
        IUserQueryRepository userQueryRepository, IUserCommandRepository userCommandRepository) : base(mapper)
        {
            _userService = userService;
            _authService = authService;
            _userQueryRepository = userQueryRepository;
            _userCommandRepository = userCommandRepository;
        }

        [HttpGet("is-registered")]
        public async Task<bool> IsEmailRegistered(string email)
        {
            var isRegistered = await _authService.DoesUserRegistered(email);
            return isRegistered; 
        }
        
        [HttpPost("sign-up")]
        public async Task<AuthUserDTO> Register([FromBody] CreateUpdateUserDTO newUser)
        {
            CreateUserDTOValidator.ValidateUser(newUser);

            var user = _mapper.Map<User>(newUser);
            
            user = await _userService.CreateUser(user);
            user.RefreshToken = _authService.GenerateRefreshToken();
            user = await _userCommandRepository.CreateUser(user);
            SetRefreshToken(user.RefreshToken);
            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(user),
                Token = await _authService.AuthUser(user)
            };
        }
        
        [HttpPost("sign-in")]
        public async Task<AuthUserDTO> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            LoginUserDTOValidator.ValidateUser(loginUserDTO);
            
            var userEntity = await _userQueryRepository.GetUserByEmail(loginUserDTO.Email);
            userEntity.RefreshToken = _authService.GenerateRefreshToken();
            await _userCommandRepository.UpdateUser(userEntity);
            SetRefreshToken(userEntity.RefreshToken);
            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userEntity),
                Token = await _authService.AuthUser(userEntity)
            };
        }

        [HttpPost("Refresh-token")]
        public async Task<AuthUserDTO> RefreshToken([FromBody] RefreshModelDTO refreshModelDTO)
        {
            var userEntity = await _authService.RefreshToken(refreshModelDTO.AccessToken, refreshModelDTO.AccessToken);
            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userEntity),
                Token = await _authService.AuthUser(userEntity)
            };

        }
        
        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
            
        }

    }
    
}
