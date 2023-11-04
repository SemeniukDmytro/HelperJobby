using System.Security.Claims;
using ApplicationBLL.Services.Absract;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Context;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace ApplicationBLL.Services;

public class AuthService : BaseService
{
    private readonly IConfiguration _configuration;

    public AuthService(IMapper mapper, ApplicationContext applicationContext,
        IConfiguration configuration) : base(mapper, applicationContext)
    {
        _configuration = configuration;
    }


    private string CreateToken(int userId, string userEmail)
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

    public Task<AuthUserDTO> AuthUser(LoginUserDTO loginUserDto)
    {
        var userEntity = _applicationContext.Users.FirstOrDefault(u => u.Email == loginUserDto.Email);
        if (userEntity == null)
        {
            throw new Exception("User not found");
        }

        if (!BCrypt.Net.BCrypt.Verify(loginUserDto.Password, userEntity.PasswordHash))
        {
            throw new Exception("Wrong password");
        }
        
        var token = CreateToken(userEntity.Id, userEntity.Email);

        var user = _mapper.Map<UserDTO>(userEntity);
        
        return Task.FromResult(new AuthUserDTO()
        {
            User = user,
            Token = token
        });
    }
    
}