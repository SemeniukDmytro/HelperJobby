using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.User;
using HelperJobby.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ExtendedBaseController
{
    private readonly IRecentUserSearchCommandRepository _recentUserSearchCommandRepository;
    private readonly IRecentUserSearchQueryRepository _recentUserSearchQueryRepository;
    private readonly IRecentUserSearchService _recentUserSearchService;
    private readonly IUserCommandRepository _userCommandRepository;
    private readonly IUserQueryRepository _userQueryRepository;
    private readonly IUserService _userService;

    public UserController(IUserQueryRepository userQueryRepository, IMapper mapper, IUserService userService,
        IUserCommandRepository userCommandRepository, IRecentUserSearchService recentUserSearchService,
        IRecentUserSearchQueryRepository recentUserSearchQueryRepository,
        IRecentUserSearchCommandRepository recentUserSearchCommandRepository) : base(mapper)
    {
        _userQueryRepository = userQueryRepository;
        _userService = userService;
        _userCommandRepository = userCommandRepository;
        _recentUserSearchService = recentUserSearchService;
        _recentUserSearchQueryRepository = recentUserSearchQueryRepository;
        _recentUserSearchCommandRepository = recentUserSearchCommandRepository;
    }

    [HttpGet("{id}")]
    public async Task<UserDTO> GetUser(int id)
    {
        var user = await _userQueryRepository.GetUserById(id);
        var userDTO = _mapper.Map<UserDTO>(user);

        return userDTO;
    }

    [HttpGet("current-user")]
    public async Task<UserDTO> GetCurrentUser()
    {
        var user = await _userQueryRepository.GetUserById(_userService.GetCurrentUserId());
        var userDTO = _mapper.Map<UserDTO>(user);
        return userDTO;
    }

    [HttpPut("{id}")]
    public async Task<UserDTO> PutUser(int id, [FromBody] CreateUpdateUserDTO updatedUserDTO)
    {
        UpdateUserDTOValidator.ValidateUser(updatedUserDTO);
        var updatedUserModel = await _userService.UpdateUser(id, _mapper.Map<User>(updatedUserDTO));
        updatedUserModel = await _userCommandRepository.UpdateUser(updatedUserModel);
        return _mapper.Map<UserDTO>(updatedUserModel);
    }

    [HttpPut("vulnerable-info/{id}")]
    public async Task<UserDTO> PutUserVulnerableInfo(int id,
        [FromBody] UpdatedUserWithCurrentPasswordDTO updatedUserWithCurrentPasswordDto)
    {
        var updatedUserDTO = _mapper.Map<CreateUpdateUserDTO>(updatedUserWithCurrentPasswordDto);
        UpdateUserDTOValidator.ValidateUser(updatedUserDTO);
        var updatedUserModel = await _userService.UpdateUserVulnerableInfo(id, _mapper.Map<User>(updatedUserDTO),
            updatedUserWithCurrentPasswordDto.CurrentPassword);
        updatedUserModel = await _userCommandRepository.UpdateUser(updatedUserModel);
        return _mapper.Map<UserDTO>(updatedUserModel);
    }

    [HttpGet("recent-searches")]
    public async Task<IEnumerable<RecentUserSearchDTO>> GetUserRecentSearches()
    {
        var currentUserId = _userService.GetCurrentUserId();
        return _mapper.Map<IEnumerable<RecentUserSearchDTO>>(
            await _recentUserSearchQueryRepository.GetRecentUserSearches(currentUserId));
    }

    [HttpDelete("remove-search/{searchId}")]
    public async Task DeleteUserRecentSearch(int searchId)
    {
        var recentSearchEntity = await _recentUserSearchService.DeleteRecentSearch(searchId);
        await _recentUserSearchCommandRepository.DeleteRecentUserSearch(recentSearchEntity);
    }
}