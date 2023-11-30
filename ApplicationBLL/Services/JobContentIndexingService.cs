using System.Diagnostics;
using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class JobContentIndexingService : IJobContentIndexingService
{
    private readonly IJobIndexingQueryRepository _jobIndexingQueryRepository;
    private readonly IJobIndexingCommandRepository _jobIndexingCommandRepository;

    public JobContentIndexingService(IJobIndexingQueryRepository jobIndexingQueryRepository, IJobIndexingCommandRepository jobIndexingCommandRepository)
    {
        _jobIndexingQueryRepository = jobIndexingQueryRepository;
        _jobIndexingCommandRepository = jobIndexingCommandRepository;
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
        var processedContent = WordFrequencyCounterForJob(TextSplitter.TextNormalization(job.JobTitle),
            jobFeatures.ToArray(), TextSplitter.TextNormalization(job.Description));

        List<JobIndexedWord> newIndexedJobWords = new List<JobIndexedWord>();
        List<ProcessedJobWord> newProcessedJobWords = new List<ProcessedJobWord>();
        
        var wordsToRetrieve = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        var wordEntities = await _jobIndexingQueryRepository.GetJobIndexedWords(wordsToRetrieve);
        
        
        foreach (var keyValuePair in processedContent)
        {
            
            var possibleWordEntity = wordEntities.FirstOrDefault(w => w.Word == keyValuePair.Key);
            keyValuePair.Value.JobId = job.Id;
            if (possibleWordEntity != null)
            {
                possibleWordEntity.JobCount++;
                await _jobIndexingCommandRepository.UpdateIndexedWordJobCount(possibleWordEntity);
                keyValuePair.Value.JobIndexedWordId = possibleWordEntity.Id;
                newProcessedJobWords.Add(keyValuePair.Value);
            }
            else
            {
                newIndexedJobWords.Add(new JobIndexedWord()
                {
                    JobCount = 1,
                    Word = keyValuePair.Key,
                    ProcessedJobWords = new List<ProcessedJobWord>() {keyValuePair.Value}
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

    public async Task DeleteIndexedJobContent(Job job)
    {
        await _jobIndexingCommandRepository.RemoveProcessedJobWords(job.Id);
    }
    
    

    private Dictionary<string, ProcessedJobWord> WordFrequencyCounterForJob(string[] titleWords, string[] jobFeatures,
        string[] descriptionWords)
    {
        var result = new Dictionary<string, ProcessedJobWord>();

        ProcessWords(titleWords, JobWordOccurrences.JobTitle);
        ProcessWords(jobFeatures, JobWordOccurrences.JobFeatures);
        ProcessWords(descriptionWords, JobWordOccurrences.JobDescription);

        return result;
        
        void ProcessWords(string[] words, JobWordOccurrences jobWordOccurrence)
        {
            foreach (var word in words)
            {
                if (result.TryGetValue(word, out var processedJobWord))
                {
                    if ((processedJobWord.JobWordOccurrences & jobWordOccurrence) != jobWordOccurrence)
                    {
                        processedJobWord.JobWordOccurrences |= jobWordOccurrence;
                    }

                    processedJobWord.WordCount++;
                    result[word] = processedJobWord;
                }
                else
                {
                    result.Add(word, new ProcessedJobWord
                    {
                        WordCount = 1,
                        JobWordOccurrences = jobWordOccurrence
                    });
                }
            }
        }
    }

}