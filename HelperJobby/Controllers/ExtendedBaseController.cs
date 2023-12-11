using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers;

public class ExtendedBaseController : ControllerBase
{
    protected IMapper _mapper;

    public ExtendedBaseController(IMapper mapper)
    {
        _mapper = mapper;
    }
}