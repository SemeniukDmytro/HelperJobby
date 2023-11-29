using System.Diagnostics;
using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.Enums;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ContentIndexingService : IContentIndexingService
{
    private readonly IIndexingQueryRepository _indexingQueryRepository;
    private readonly IIndexingCommandRepository _indexingCommandRepository;

    public ContentIndexingService(IIndexingQueryRepository indexingQueryRepository, IIndexingCommandRepository indexingCommandRepository)
    {
        _indexingQueryRepository = indexingQueryRepository;
        _indexingCommandRepository = indexingCommandRepository;
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
        var processedContent = WordFrequencyCounter(TextNormalization(job.JobTitle),
            jobFeatures.ToArray(), TextNormalization(job.Description));

        List<IndexedJobWord> newIndexedJobWords = new List<IndexedJobWord>();
        List<ProcessedJobWord> newProcessedJobWords = new List<ProcessedJobWord>();
        
        var keysToRetrieve = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        var wordEntities = await _indexingQueryRepository.GetIndexedJobWords(keysToRetrieve);
        
        
        foreach (var keyValuePair in processedContent)
        {
            
            var possibleWordEntity = wordEntities.FirstOrDefault(w => w.Word == keyValuePair.Key);
            
            if (possibleWordEntity != null)
            {
                keyValuePair.Value.IndexedJobWordId = possibleWordEntity.Id;
                newProcessedJobWords.Add(keyValuePair.Value);
            }
            else
            {
                newIndexedJobWords.Add(new IndexedJobWord()
                {
                    Word = keyValuePair.Key,
                    ProcessedJobWords = new List<ProcessedJobWord>() {keyValuePair.Value}
                });
            }
            
        }

        
        await _indexingCommandRepository.SaveIndexedJobWords(newIndexedJobWords);
        await _indexingCommandRepository.SaveProcessedJobWords(newProcessedJobWords);
    }

    public async Task IndexResumeContent(Resume resume)
    {
        throw new NotImplementedException();
    }

    public async Task IndexEducationContent(Education education)
    {
        throw new NotImplementedException();
    }

    public async Task IndexWorkExperienceContent(WorkExperience workExperience)
    {
        throw new NotImplementedException();
    }

    public async Task IndexSkill(Skill skill)
    {
        throw new NotImplementedException();
    }
    
    private string[] TextNormalization(string text)
    {
        text = text.ToLower();
        var separators = new[] { ' ', '.', ',', ';', ':', '!', '?'};
        string[] tokens = text.Split(separators, StringSplitOptions.RemoveEmptyEntries);
        return tokens;
    }

    private Dictionary<string, ProcessedJobWord> WordFrequencyCounter(string[] titleWords, string[] jobFeatures,
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