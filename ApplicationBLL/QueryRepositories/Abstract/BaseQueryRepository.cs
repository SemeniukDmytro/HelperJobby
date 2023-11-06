using ApplicationDAL.Context;
using AutoMapper;

namespace ApplicationBLL.QueryRepositories.Abstract;

public class BaseQueryRepository
{
    protected readonly ApplicationContext _applicationContext;
    protected readonly IMapper _mapper;

    protected BaseQueryRepository(IMapper mapper, ApplicationContext applicationContext)
    {
        _applicationContext = applicationContext;
        _mapper = mapper;
    }
}