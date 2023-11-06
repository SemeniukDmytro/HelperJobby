using ApplicationBLL.Services.Absract;
using ApplicationBLL.Services.EmailAvailabilityService;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Context;
using ApplicationDAL.Entities;
using AutoMapper;
using FluentValidation;
using ValidationException = FluentValidation.ValidationException;
using ValidationResult = FluentValidation.Results.ValidationResult;

namespace ApplicationBLL.Services.UserService;

public class UserService : BaseService, IUserService
{
    private IEmailAvailabilityService _emailAvailabilityService;
    private IValidator<RegisterUserDTO> _registerUserValidator;
    
    public UserService(IMapper mapper, ApplicationContext applicationContext, IEmailAvailabilityService emailAvailabilityService, IValidator<RegisterUserDTO> registerUserValidator) : base(mapper, applicationContext)
    {
        _emailAvailabilityService = emailAvailabilityService;
        _registerUserValidator = registerUserValidator;
    }


    public async Task CreateUser(RegisterUserDTO registerUserDTO)
    {
        ValidationResult validationResult = await _registerUserValidator.ValidateAsync(registerUserDTO);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors[0].ErrorMessage);
        }
        
        if (!await _emailAvailabilityService.IsEmailAvailable(registerUserDTO.Email))
        {
            throw new Exception("Email is already in use.");
        }

        var userEntity = _mapper.Map<User>(registerUserDTO);

        userEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUserDTO.Password);

        _applicationContext.Users.Add(userEntity);
        await _applicationContext.SaveChangesAsync();
    }

    
}