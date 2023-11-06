namespace ApplicationBLL.Services.EmailAvailabilityService;

public interface IEmailAvailabilityService
{
    public Task<bool> IsEmailAvailable(string email);
}