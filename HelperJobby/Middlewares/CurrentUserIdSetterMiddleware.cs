﻿using ApplicationBLL.Interfaces;

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
        
        string? userIdentityClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

        if (userIdentityClaim != null && int.TryParse(userIdentityClaim, out int id))
        {
            userIdSetter.CurrentId = id;
        }

    await _next.Invoke(httpContext);
    }
}