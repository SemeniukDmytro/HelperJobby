using ApplicationDomain.Absraction.ICommandRepositories;
using ApplicationDomain.Absraction.IQueryRepositories;
using ApplicationDomain.Absraction.IServices;
using ApplicationDomain.Models;
using AutoMapper;
using HelperJobby.DTOs.Job;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrentJobController : ExtendedBaseController
    {
        private readonly ICurrentJobCreationService _currentJobCreationService;
        private readonly ICurrentJobCreationQueryRepository _currentJobCreationQueryRepository;
        private readonly ICurrentJobCreationCommandRepository _currentJobCreationCommandRepository;
        
        public CurrentJobController(IMapper mapper, ICurrentJobCreationCommandRepository currentJobCreationCommandRepository, ICurrentJobCreationQueryRepository currentJobCreationQueryRepository, ICurrentJobCreationService currentJobCreationService) : base(mapper)
        {
            _currentJobCreationCommandRepository = currentJobCreationCommandRepository;
            _currentJobCreationQueryRepository = currentJobCreationQueryRepository;
            _currentJobCreationService = currentJobCreationService;
        }
        // GET: api/CurrentJob/current-job-creation
        [HttpGet("{employerAccountId}/current-job-creation")]
        public async Task<CurrentJobCreationDTO> GetCurrentJob(int employerAccountId)
        {
            return _mapper.Map<CurrentJobCreationDTO>(await 
                _currentJobCreationQueryRepository.GetJobCreationByEmployerId(employerAccountId));
        }

        // POST: api/CurrentJob
        [HttpPost]
        public async Task<CurrentJobCreationDTO> Post([FromBody] CurrentJobCreateDTO currentJobCreateDTO)
        {
            var jobCreation =
                await _currentJobCreationService.StartJobCreation(
                    _mapper.Map<CurrentJobCreation>(currentJobCreateDTO));
            var createdJobCreationDTO =  _mapper.Map<CurrentJobCreationDTO>(await _currentJobCreationCommandRepository.CreateCurrentJob(jobCreation));
            return createdJobCreationDTO;
        }

        // PUT: api/CurrentJob/5
        [HttpPut("employer-account/{employerId}/current-job/{jobId}")]
        public async Task<CurrentJobCreationDTO> Put(int jobId, int employerId, [FromBody] CurrentJobCreateDTO currentJobCreationDTO)
        {
            var jobCreation =
                await _currentJobCreationService.UpdateCurrentJob(jobId, employerId,
                    _mapper.Map<CurrentJobCreation>(currentJobCreationDTO));
            var createdJobCreationDTO =  _mapper.Map<CurrentJobCreationDTO>(await _currentJobCreationCommandRepository.UpdateCurrenJob(jobCreation));
            return createdJobCreationDTO;
        }

        // DELETE: api/CurrentJob/employer-account/1/current-job/5
        [HttpDelete("employer-account/{employerId}/current-job/{jobId}")]
        public async Task Delete(int employerId, int jobId)
        {
            var jobCreation = await _currentJobCreationService.DeleteCurrentJob(jobId, employerId);
            await _currentJobCreationCommandRepository.DeleteCurrentJob(jobCreation);
        }

        
    }
}
