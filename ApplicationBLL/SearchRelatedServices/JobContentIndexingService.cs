using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.SearchICommandRepositories;
using ApplicationDomain.Abstraction.SearchIQueryRepositories;
using ApplicationDomain.Abstraction.SearchRelatedIServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;

namespace ApplicationBLL.SearchRelatedServices;

public class JobContentIndexingService : IJobContentIndexingService
{
    private readonly IJobIndexingQueryRepository _jobIndexingQueryRepository;
    private readonly IJobIndexingCommandRepository _jobIndexingCommandRepository;
    private readonly IRankingService _rankingService;

    public JobContentIndexingService(IJobIndexingQueryRepository jobIndexingQueryRepository, IJobIndexingCommandRepository jobIndexingCommandRepository, IRankingService rankingService)
    {
        _jobIndexingQueryRepository = jobIndexingQueryRepository;
        _jobIndexingCommandRepository = jobIndexingCommandRepository;
        _rankingService = rankingService;
    }

    public async Task IndexJobContent(Job job)
    {
        List<string> jobFeatures = new List<string>();
        jobFeatures.AddRange(FlagsEnumToArrayConverter.
            GetArrayWithEnumValues<EmployeeBenefits>((int)job.Benefits)
            .Select(b => b.ToString().ToLower()));
        jobFeatures.AddRange(FlagsEnumToArrayConverter.
            GetArrayWithEnumValues<Schedules>((int)job.Schedule)
            .Select(b => b.ToString().ToLower()));
        jobFeatures.AddRange(FlagsEnumToArrayConverter.
            GetArrayWithEnumValues<JobTypes>((int)job.JobTypes)
            .Select(b => b.ToString().ToLower()));
        var processedContent = _rankingService.CalculateJobWordScores(TextSplitter.TextNormalization(job.JobTitle),
            jobFeatures.ToArray(), TextSplitter.TextNormalization(job.Description));

        List<JobIndexedWord> newIndexedJobWords = new List<JobIndexedWord>();
        List<ProcessedJobWord> newProcessedJobWords = new List<ProcessedJobWord>();
        
        var wordsToRetrieve = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        var wordEntities = await _jobIndexingQueryRepository.GetJobIndexedWords(wordsToRetrieve);
        
        
        foreach (var weightedWord in processedContent)
        {
            
            var possibleWordEntity = wordEntities.FirstOrDefault(w => w.Word == weightedWord.Key);
            ProcessedJobWord newProcessedJobWord = new ProcessedJobWord()
            {
                Rating = weightedWord.Value,
                JobId = job.Id
            };
            if (possibleWordEntity != null)
            {
                possibleWordEntity.JobCount++;
                await _jobIndexingCommandRepository.UpdateIndexedWordJobCount(possibleWordEntity);
                newProcessedJobWord.JobIndexedWordId = possibleWordEntity.Id;
                newProcessedJobWords.Add(newProcessedJobWord);
            }
            else
            {
                newIndexedJobWords.Add(new JobIndexedWord()
                {
                    JobCount = 1,
                    Word = weightedWord.Key,
                    ProcessedJobWords = new List<ProcessedJobWord>() {newProcessedJobWord}
                });
            }
            
        }
        await _jobIndexingCommandRepository.SaveIndexedJobWords(newIndexedJobWords);
        await _jobIndexingCommandRepository.SaveProcessedJobWords(newProcessedJobWords);
    } 
    
    public async Task UpdateAndIndexJobContent(Job job)
    {
        await _jobIndexingCommandRepository.RemoveProcessedJobWords(job.Id);
        await IndexJobContent(job);
    }

    public async Task RemoveIndexedJobContent(Job job)
    {
        await _jobIndexingCommandRepository.RemoveProcessedJobWords(job.Id);
    }
    

}