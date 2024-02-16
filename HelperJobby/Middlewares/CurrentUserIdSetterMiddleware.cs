using ApplicationBLL.Interfaces;

namespace HelperJobby.Middlewares;

public class CurrentUserIdSetterMiddleware
{
    private readonly RequestDelegate _next;

    public CurrentUserIdSetterMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext, IUserIdSetter userIdSetter)
    {
        var userIdentityClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        var jobSeekerIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "jobSeekerId")?.Value;
        var employerIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "employerId")?.Value;

        if (userIdentityClaim != null && int.TryParse(userIdentityClaim, out var id)) userIdSetter.CurrentId = id;
        if (jobSeekerIdClaim != null && int.TryParse(jobSeekerIdClaim, out var jobSeekerId))
            userIdSetter.CurrentJobSeekerId = jobSeekerId;
        if (employerIdClaim != null && int.TryParse(employerIdClaim, out var employerId))
            userIdSetter.CurrentEmployerId = employerId;

        await _next.Invoke(httpContext);
    }
}