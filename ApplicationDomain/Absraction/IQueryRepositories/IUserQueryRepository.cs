using ApplicationDomain.Models;

namespace ApplicationDomain.Absraction.IQueryRepositories;

public interface IUserQueryRepository
{
    /// <summary>
    /// Retrieves a user from the database based on the provided user ID, allowing customization
    /// of the query through an optional includeQuery parameter to eagerly load related entities.
    /// </summary>
    /// <param name="userId">The unique identifier of the user to retrieve.</param>
    /// <param name="includeQuery">An optional function to customize the query by including related entities.</param>
    public Task<User> GetUser(int userId, Func<IQueryable<User>, IQueryable<User>> includeQuery=null);
    public Task<bool> IsEmailAvailable(string email);
    public Task<User> GetUserByEmail(string email);
}