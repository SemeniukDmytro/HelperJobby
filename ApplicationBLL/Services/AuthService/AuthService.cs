using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using ApplicationBLL.Exceptions;
using ApplicationBLL.Services.Absract;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Context;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ApplicationBLL.Services.AuthService;

public class AuthService : BaseService, IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly IValidator<LoginUserDTO> _validator;

    public AuthService(IMapper mapper, ApplicationContext applicationContext,
        IConfiguration configuration, IValidator<LoginUserDTO> validator) : base(mapper, applicationContext)
    {
        _configuration = configuration;
        _validator = validator;
    }


    public string CreateToken(int userId, string userEmail)
    {
        var identity = new ClaimsIdentity(new GenericIdentity(userEmail, "Token"), new[]
        {
            new Claim("id", userId.ToString())
        });
        
        List<Claim> claims = new List<Claim>()
        {
            new (JwtRegisteredClaimNames.Email, userEmail),
            new (JwtRegisteredClaimNames.Sub, userId.ToString()),
            identity.FindFirst("id")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds);
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }

    public async Task<AuthUserDTO> AuthUser(LoginUserDTO loginUserDto)
    {
        ValidationResult validationResult = await _validator.ValidateAsync(loginUserDto);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors[0].ErrorMessage);
        }
        
        
        var userEntity = _applicationContext.Users.FirstOrDefault(u => u.Email == loginUserDto.Email);
        if (userEntity == null)
        {
            throw new UserNotFoundException("User with provided email is not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(loginUserDto.Password, userEntity.PasswordHash))
        {
            throw new UserNotFoundException("Password provided for specified email is wrong");
        }
        
        var token = CreateToken(userEntity.Id, userEntity.Email);

        var user = _mapper.Map<UserDTO>(userEntity);
        
        return new AuthUserDTO()
        {
            User = user,
            Token = token
        };
    }
    
}