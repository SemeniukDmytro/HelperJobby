using ApplicationDomain.AuthRelatedModels;
using ApplicationDomain.Models;

namespace ApplicationDomain.Abstraction.IServices;

public interface IAuthService
{
    public string CreateAuthToken(int userId, string userEmail, int jobSeekerId, int? employerId);
    public RefreshToken GenerateRefreshToken();
    public Task<(User user, string authToken)> AuthUser(User loginUser);
    public Task<bool> IsUserRegistered(string email);
    public Task<User> RefreshToken(string accessToken, string refreshToken);
}