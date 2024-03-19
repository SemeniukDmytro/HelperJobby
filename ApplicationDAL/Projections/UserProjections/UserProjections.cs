using System.Linq.Expressions;
using ApplicationDomain.Models;

namespace ApplicationDAL.Projections.UserProjections;

public static class UserProjections
{
    public static Expression<Func<User, User>> UserWithRefreshTokenAndAccountIds()
    {
        return u =>
            new User
            {
                Id = u.Id,
                AccountType = u.AccountType,
                PasswordHash = u.PasswordHash,
                Email = u.Email,
                JobSeeker = new JobSeeker
                {
                    Id = u.JobSeeker.Id
                },
                Employer = u.Employer != null
                    ? new Employer
                    {
                        Id = u.Employer.Id
                    }
                    : null,
                RefreshToken = u.RefreshToken
            };
    }
}