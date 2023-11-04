using ApplicationDAL.Context;
using AutoMapper;

namespace ApplicationBLL.Services.Absract;

public class BaseService
{
    protected IMapper _mapper;
    protected ApplicationContext _applicationContext;

    public BaseService(IMapper mapper, ApplicationContext applicationContext)
    {
        _mapper = mapper;
        _applicationContext = applicationContext;
    }
}