using System.ComponentModel.DataAnnotations;
using ApplicationBLL.Services.Absract;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Context;
using ApplicationDAL.Entities;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using ValidationException = FluentValidation.ValidationException;
using ValidationResult = FluentValidation.Results.ValidationResult;

namespace ApplicationBLL.Services;

public class UserService : BaseService
{
    private EmailValidatorService _emailValidatorService;
    private IValidator<RegisterUserDTO> _registerUserValidator;
    
    public UserService(IMapper mapper, ApplicationContext applicationContext, EmailValidatorService emailValidatorService, IValidator<RegisterUserDTO> registerUserValidator) : base(mapper, applicationContext)
    {
        _emailValidatorService = emailValidatorService;
        _registerUserValidator = registerUserValidator;
    }


    public async Task CreateUser(RegisterUserDTO registerUserDTO)
    {
        ValidationResult validationResult = await _registerUserValidator.ValidateAsync(registerUserDTO);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors[0].ErrorMessage);
        }
        
        if (!await _emailValidatorService.IsEmailAvailable(registerUserDTO.Email))
        {
            throw new Exception("Email is already in use.");
        }

        var userEntity = _mapper.Map<User>(registerUserDTO);

        userEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerUserDTO.Password);

        _applicationContext.Users.Add(userEntity);
        await _applicationContext.SaveChangesAsync();
    }

    
}