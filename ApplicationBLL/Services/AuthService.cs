using System.Security.Claims;
using ApplicationBLL.Services.Absract;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Context;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ApplicationBLL.Exceptions;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace ApplicationBLL.Services;

public class AuthService : BaseService
{
    private readonly IConfiguration _configuration;
    private readonly IValidator<LoginUserDTO> _validator;

    public AuthService(IMapper mapper, ApplicationContext applicationContext,
        IConfiguration configuration, IValidator<LoginUserDTO> validator) : base(mapper, applicationContext)
    {
        _configuration = configuration;
        _validator = validator;
    }

    public AuthService(IValidator<LoginUserDTO> validator) : base(null, null)
    {
        _validator = validator;
    }


    public string CreateToken(int userId, string userEmail)
    {
        List<Claim> claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Email, userEmail),
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString())
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