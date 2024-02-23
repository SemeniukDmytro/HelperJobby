using System.Net;
using System.Text.Json;
using ApplicationDomain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Middlewares;

public class ExceptionsHandlingMiddleware
{
    private readonly ILogger<ExceptionsHandlingMiddleware> _logger;
    private readonly RequestDelegate _next;

    public ExceptionsHandlingMiddleware(RequestDelegate next, ILogger<ExceptionsHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundExceptionBase notFoundException)
        {
            _logger.LogError($"Not found error message: {notFoundException.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.NotFound,
                Type = "NotFoundException",
                Title = $"{notFoundException.EntityName} not found",
                Detail = notFoundException.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (InvalidModelExceptionBase invalidModelExceptionBase)
        {
            _logger.LogError($"Invalid data provided: {invalidModelExceptionBase.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.BadRequest,
                Type = "Validation error",
                Title = $"{invalidModelExceptionBase.EntityName} provided with invalid data",
                Detail = invalidModelExceptionBase.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (ForbiddenException forbiddenException)
        {
            _logger.LogError($"Forbidden exception :{forbiddenException.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.Forbidden,
                Type = "ForbiddenException",
                Title = "You can not perform this action",
                Detail = forbiddenException.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (EmailIsNotAvailableException emailIsNotAvailableException)
        {
            _logger.LogError($"{emailIsNotAvailableException.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.Conflict;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.Conflict,
                Type = "EmailIsNotAvailableException",
                Title = "Email Already in Use",
                Detail = emailIsNotAvailableException.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (JobApplyingException jobApplyingException)
        {
            _logger.LogError($"{jobApplyingException.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.Conflict;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.Conflict,
                Type = "JobApplyingException",
                Title = "Job Applying Conflict",
                Detail = jobApplyingException.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (InterviewOperatingException interviewOperatingException)
        {
            _logger.LogError($"{interviewOperatingException.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.Conflict;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.Conflict,
                Type = "InterviewOperatingException",
                Title = "Operating Interview Conflict",
                Detail = interviewOperatingException.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (JobSavingException jobSavingException)
        {
            _logger.LogError($"{jobSavingException.Message}");
            context.Response.StatusCode = (int)HttpStatusCode.Conflict;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.Conflict,
                Type = "JobSavingException",
                Title = "Saving job conflict",
                Detail = jobSavingException.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Internal server error message: {ex}");
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            ProblemDetails errorResponse = new()
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Type = $"{ex.GetType().Name}",
                Title = "Internal server error",
                Detail = ex.Message
            };

            var json = JsonSerializer.Serialize(errorResponse);

            await context.Response.WriteAsync(json);
        }
    }
}