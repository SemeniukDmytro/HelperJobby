using ApplicationBLL.Services.Absract;
using ApplicationDAL.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationBLL.Services;

public class EmailValidatorService : BaseService
{

    public EmailValidatorService(IMapper mapper, ApplicationContext applicationContext) : base(mapper, applicationContext)
    {
    }
    
    private bool IsValidEmail(string email)
    {
        int atSymbolIndex = email.LastIndexOf('@');
        return atSymbolIndex >= 0 && email.LastIndexOf('.') >= atSymbolIndex && atSymbolIndex == email.IndexOf('@') &&
               email.Length - atSymbolIndex >= 4;
    }

    public async Task<bool> IsEmailAvailable(string email)
    {
        if (!IsValidEmail(email))
        {
            return false;
        }

        return !await _applicationContext.Users.AnyAsync(u => u.Email == email);
    }
}