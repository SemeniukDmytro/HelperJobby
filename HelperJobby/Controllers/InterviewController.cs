using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using AutoMapper;
using HelperJobby.DTOs.Job;
using HelperJobby.DTOs.UserJobInteractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HelperJobby.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InterviewController : ExtendedBaseController
    {
        private readonly IJobQueryRepository _jobQueryRepository;
        private readonly IJobSeekerAccountQueryRepository _jobSeekerAccountQueryRepository;
        private readonly IUserService _userService;
        private readonly IInterviewService _interviewService;
        private readonly IInterviewCommandRepository _interviewCommandRepository;
        private readonly IInterviewQueryRepository _interviewQueryRepository;
        
        
        public InterviewController(IMapper mapper, IJobQueryRepository jobQueryRepository, IJobSeekerAccountQueryRepository jobSeekerAccountQueryRepository, IUserService userService, IInterviewService interviewService, IInterviewCommandRepository interviewCommandRepository, IInterviewQueryRepository interviewQueryRepository) : base(mapper)
        {
            _jobQueryRepository = jobQueryRepository;
            _jobSeekerAccountQueryRepository = jobSeekerAccountQueryRepository;
            _userService = userService;
            _interviewService = interviewService;
            _interviewCommandRepository = interviewCommandRepository;
            _interviewQueryRepository = interviewQueryRepository;
        }
        // GET: api/Interview/my-interviews
        [HttpGet("my-interviews")]
        public async Task<IEnumerable<InterviewDTO>> GetCurrentJobSeekerInterviews()
        {
            var currentJobSeeker = await _jobSeekerAccountQueryRepository.GetJobSeekerAccountWithInterviews(
                _userService.GetCurrentUserId());
            return _mapper.Map<IEnumerable<InterviewDTO>>(currentJobSeeker);
        }
        
        // GET: api/Interview/{jobId}/interviews
        [HttpGet("{jobId}/interviews")]
        public async Task<IEnumerable<InterviewDTO>> GetInterviewsByJobId(int jobId)
        {
            var job = await _interviewService.GetInterviewsForSpecificJob(jobId);
            job = await _jobQueryRepository.GetJobWithInterviews(job);
            return _mapper.Map<IEnumerable<InterviewDTO>>(job.Interviews);
        }

        // GET: api/Interview/{jobId}/job-seeker/{jobSeekerId}
        [HttpGet("{jobId}/job-seeker/{jobSeekerId}")]
        public async Task<InterviewDTO> Get(int jobId, int jobSeekerId)
        {
            var interview = await _interviewQueryRepository.GetInterviewByJobIdAndJobSeeker(jobId, jobSeekerId);
            return _mapper.Map<InterviewDTO>(interview);
        }

        // POST: api/Interview/{jobId}/job-seeker/{jobSeekerId}
        [HttpPost("{jobId}/job-seeker/{jobSeekerId}")]
        public async Task<InterviewDTO> CreateInterview(int jobId, int jobSeekerId)
        {
            var interview = await _interviewService.PostInterview(jobId, jobSeekerId);
            interview = await _interviewCommandRepository.CreateInterview(interview);
            return _mapper.Map<InterviewDTO>(interview);
        }

        // DELETE: api/Interview/{jobId}/job-seeker/{jobSeekerId}
        [HttpDelete("{jobId}/job-seeker/{jobSeekerId}")]
        public async Task Delete(int jobId, int jobSeekerId)
        {
            var interview = await _interviewService.DeleteInterview(jobId, jobSeekerId);
            await _interviewCommandRepository.DeleteInterview(interview);
        }

        
    }
}
