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
            var isRegistered = await _authService.IsUserRegistered(email);
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
            var userWithToken = await _authService.AuthUser(_mapper.Map<User>(newUser));
            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userWithToken.user),
                Token = userWithToken.authToken
            };
        }
        
        [HttpPost("sign-in")]
        public async Task<AuthUserDTO> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            LoginUserDTOValidator.ValidateUser(loginUserDTO);

            var userWithToken = await _authService.AuthUser(_mapper.Map<User>(loginUserDTO));
            
            var authUser =  new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userWithToken.user),
                Token = userWithToken.authToken
            };
            userWithToken.user.RefreshToken = _authService.GenerateRefreshToken();
            await _userCommandRepository.UpdateUser(userWithToken.user);
            SetRefreshToken(userWithToken.user.RefreshToken);
            return authUser;
        }

        [HttpPost("refresh-token")]
        public async Task<AuthUserDTO> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var authorizationHeader = Request.Headers["Authorization"].ToString();
            var accessToken = authorizationHeader.Replace("Bearer ", "");
            var userEntity = await _authService.RefreshToken(accessToken, refreshToken);
            var userWithToken = await _authService.AuthUser(_mapper.Map<User>(userEntity));
            return new AuthUserDTO()
            {
                User = _mapper.Map<UserDTO>(userWithToken.user),
                Token = userWithToken.authToken
            };
        }
        
        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires,
                Secure = true,
                SameSite = SameSiteMode.None,
                Domain = "localhost"
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
        }

    }
    
}
