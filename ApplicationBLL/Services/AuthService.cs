using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using ApplicationBLL.Interfaces;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.Exceptions;
using ApplicationDomain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ApplicationBLL.Services;

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly IUserQueryRepository _userQueryRepository;
    private readonly IPasswordHandler _passwordHandler;

    public AuthService(IConfiguration configuration, IUserQueryRepository userQueryRepository, IPasswordHandler passwordHandler)
    {
        _configuration = configuration;
        _userQueryRepository = userQueryRepository;
        _passwordHandler = passwordHandler;
    }
    

    public string CreateAuthToken(int userId, string userEmail)
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
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: creds);
        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
    
    public RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken()
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            CreatedAt = DateTime.UtcNow,
            Expires = DateTime.Now.AddDays(30)
        };

        return refreshToken;
    }
    
    public async Task<User> RefreshToken(string accessToken, string refreshToken)
    {
        var principal = GetPrincipalFromExpiredToken(accessToken);
        if (principal.FindFirst("id")?.Value is null)
        {
            throw new UnauthorizedException();
        }
        string userId = principal.FindFirst("id")?.Value;
        var user = await _userQueryRepository.GetUserByIdWithRefreshToken(int.Parse(userId));

        if (user == null || user.RefreshToken.Token != refreshToken ||
            user.RefreshToken.Expires < DateTime.UtcNow)
        {
            throw new UnauthorizedException();
        }

        return user;
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
    {
        var validation = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateLifetime = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]!))
        };
        return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
    }

    public async Task<(User user, string authToken)> AuthUser(User loginUser)
    {
        var userEntity = await _userQueryRepository.GetUserByEmailWithRefreshToken(loginUser.Email);

        if (!_passwordHandler.Verify(loginUser.PasswordHash, userEntity.PasswordHash))
        {
            throw new UserNotFoundException("Password provided for specified email is wrong");
        }
        
        var token = CreateAuthToken(userEntity.Id, userEntity.Email);
        return (userEntity, token);
    }

    
    
    public async Task<bool> IsUserRegistered(string email)
    {
        User userEntity = null;
        try
        {
            userEntity = await _userQueryRepository.GetUserByEmail(email);
        }
        catch (Exception e)
        {
            // ignored
        }

        return userEntity != null;
    }

    
}