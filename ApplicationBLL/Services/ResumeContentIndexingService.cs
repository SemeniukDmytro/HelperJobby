using ApplicationBLL.Logic;
using ApplicationDomain.Abstraction.ICommandRepositories;
using ApplicationDomain.Abstraction.IQueryRepositories;
using ApplicationDomain.Abstraction.IServices;
using ApplicationDomain.IndexedModels;
using ApplicationDomain.Models;

namespace ApplicationBLL.Services;

public class ResumeContentIndexingService : IResumeContentIndexingService
{
    private readonly IResumeIndexingQueryRepository _resumeIndexingQueryRepository;
    private readonly IResumeIndexingCommandRepository _resumeIndexingCommandRepository;

    public ResumeContentIndexingService(IResumeIndexingQueryRepository resumeIndexingQueryRepository, IResumeIndexingCommandRepository resumeIndexingCommandRepository)
    {
        _resumeIndexingQueryRepository = resumeIndexingQueryRepository;
        _resumeIndexingCommandRepository = resumeIndexingCommandRepository;
    }

    public async Task IndexResumeContent(Resume resume)
    {
        foreach (var education in resume.Educations)
        {
            await IndexResumeRelatedContent(education.FieldOfStudy, resume.Id);
        }

        foreach (var workExperience in resume.WorkExperiences)
        {
            await IndexResumeRelatedContent(workExperience.JobTitle, resume.Id);
        }

        foreach (var skill in resume.Skills)
        {
            await IndexResumeRelatedContent(skill.Name, resume.Id);
        }
    }

    public async Task RemoveResumeIndexedContent(Resume resume)
    {
        await _resumeIndexingCommandRepository.RemoveProcessedResumeWords(resume.Id);
    }

    public async Task IndexResumeRelatedContent(string content, int resumeId)
    {
        var processedContent = ProcessAndValidateContent(content);
        if (processedContent == null) return;
        
        await AddNewResumeIndexedContent(processedContent, resumeId);
    }

    public async Task UpdateIndexedResumeRelatedContent(string oldContent, string updatedContent, int resumeId)
    {
        var oldProcessedContent = ProcessAndValidateContent(oldContent);
        if (oldProcessedContent == null) return;
        
        var updatedProcessedContent = ProcessAndValidateContent(oldContent);
        if (updatedProcessedContent == null) return;
        
        var wordsToDelete = oldProcessedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        await _resumeIndexingCommandRepository.RemoveProcessedResumeWordsByResumeId(resumeId, wordsToDelete);
        
        
        await AddNewResumeIndexedContent(updatedProcessedContent, resumeId);
    }

    public async Task RemoveIndexedResumeRelatedContent(string content, int resumeId)
    {
        var processedContent = ProcessAndValidateContent(content);
        if (processedContent == null) return;
        
        var wordsToDelete = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        await _resumeIndexingCommandRepository.RemoveProcessedResumeWordsByResumeId(resumeId, wordsToDelete);
    }

    private async Task AddNewResumeIndexedContent(Dictionary<string, int> processedContent, int resumeId)
    {
        var wordsToRetrieve = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        var wordEntities = await _resumeIndexingQueryRepository.GetResumeIndexedWords(wordsToRetrieve);

        var newIndexedResumeWords = new List<ResumeIndexedWord>();
        var newProcessedResumeWords = new List<ProcessedResumeWord>();

        foreach (var keyValuePair in processedContent)
        {
            var possibleWordEntity = wordEntities.FirstOrDefault(w => w.Word == keyValuePair.Key);
            if (possibleWordEntity != null)
            {
                possibleWordEntity.ResumesCount++;
                await _resumeIndexingCommandRepository.UpdateIndexedWordResumeCount(possibleWordEntity);
                newProcessedResumeWords.Add(new ProcessedResumeWord()
                {
                    ResumeId = resumeId,
                    ResumeIndexedWordId = possibleWordEntity.Id,
                    WordCount = keyValuePair.Value
                });
            }
            else
            {
                newIndexedResumeWords.Add(new ResumeIndexedWord()
                {
                    ResumesCount = 1,
                    Word = keyValuePair.Key,
                    ProcessedResumeWords = new List<ProcessedResumeWord>()
                    {
                        new()
                        {
                            ResumeId = resumeId,
                            WordCount = keyValuePair.Value
                        }
                    }
                });
            }
        }

        await _resumeIndexingCommandRepository.SaveIndexedResumeWords(newIndexedResumeWords);
        await _resumeIndexingCommandRepository.SaveProcessedResumeWords(newProcessedResumeWords);
    }
    
    private Dictionary<string, int> GetWordsCount(string[] words)
    {
        var result = new Dictionary<string, int>();
        foreach (var word in words)
        {
            if (result.TryGetValue(word, out int wordCount))
            {
                result[word]++;
            }
            else
            {
                result.Add(word, 1);
            }
        }

        return result;
    }
    
    private Dictionary<string, int>? ProcessAndValidateContent(string content)
    {
        if (string.IsNullOrEmpty(content))
        {
            return null;
        }

        return GetWordsCount(TextSplitter.TextNormalization(content));
    }
}