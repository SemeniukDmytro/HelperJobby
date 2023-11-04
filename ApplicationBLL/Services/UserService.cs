using ApplicationBLL.Services.Absract;
using ApplicationCommon.DTOs.User;
using ApplicationDAL.Context;
using ApplicationDAL.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationBLL.Services;

public class UserService : BaseService
{
    private EmailValidatorService _emailValidatorService;
    
    public UserService(IMapper mapper, ApplicationContext applicationContext, EmailValidatorService emailValidatorService) : base(mapper, applicationContext)
    {
        _emailValidatorService = emailValidatorService;
    }


    public async Task CreateUser(RegisterUserDTO registerUserDTO)
    {
        if (registerUserDTO == null)
        {
            throw new Exception("null user");
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