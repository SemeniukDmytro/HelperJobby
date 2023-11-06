using ApplicationBLL.Services.Absract;
using ApplicationDAL.Context;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationBLL.Services.EmailAvailabilityService;

public class EmailAvailabilityService : BaseService, IEmailAvailabilityService
{

    public EmailAvailabilityService(IMapper mapper, ApplicationContext applicationContext) : base(mapper, applicationContext)
    {
    }

    public async Task<bool> IsEmailAvailable(string email)
    {
        return !await _applicationContext.Users.AnyAsync(u => u.Email == email);
    }
}