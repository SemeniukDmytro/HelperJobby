using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ApplicationBLL.Services.AuthService;

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly IUserQueryRepository _userQueryRepository;

    public AuthService(IConfiguration configuration, IUserQueryRepository userQueryRepository)
    {
        _configuration = configuration;
        _userQueryRepository = userQueryRepository;
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

    public async Task<string> AuthUser(User loginUser)
    {
        var userEntity = await _userQueryRepository.GetUserByEmail(loginUser.Email);
        if (userEntity == null)
        {
            throw new UserNotFoundException("User with provided email is not found");
        }

        if (!loginUser.PasswordHash.Equals(userEntity.PasswordHash))
        {
            throw new UserNotFoundException("Password provided for specified email is wrong");
        }
        
        var token = CreateToken(userEntity.Id, userEntity.Email);
        return token;
    }
    
}