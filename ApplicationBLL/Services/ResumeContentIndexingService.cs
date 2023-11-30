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
        throw new NotImplementedException();
    }

    public async Task IndexEducationContent(Education education)
    {
        var contentToIndex = education.FieldOfStudy;
        if (string.IsNullOrEmpty(contentToIndex))
        {
            return;
        }

        var processedContent = GetWordsCount(TextSplitter.TextNormalization(contentToIndex));
        
        List<ResumeIndexedWord> newIndexedResumeWords = new List<ResumeIndexedWord>();
        List<ProcessedResumeWord> newProcessedResumeWords = new List<ProcessedResumeWord>();
        
        var wordsToRetrieve = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        var wordEntities = await _resumeIndexingQueryRepository.GetResumeIndexedWords(wordsToRetrieve);
        
        foreach (var keyValuePair in processedContent)
        {
            
            var possibleWordEntity = wordEntities.FirstOrDefault(w => w.Word == keyValuePair.Key);
            if (possibleWordEntity != null)
            {
                possibleWordEntity.ResumesCount++;
                await _resumeIndexingCommandRepository.UpdateIndexedWordResumeCount(possibleWordEntity);
                newProcessedResumeWords.Add(new ProcessedResumeWord()
                {
                    ResumeId = education.ResumeId,
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
                            ResumeId = education.ResumeId,
                            WordCount = keyValuePair.Value
                        }
                    }
                });
            }
            
        }
        await _resumeIndexingCommandRepository.SaveIndexedResumeWords(newIndexedResumeWords);
        await _resumeIndexingCommandRepository.SaveProcessedResumeWords(newProcessedResumeWords);
    }

    public async Task UpdateIndexedEducationContent(Education education)
    {
        var contentToIndex = education.FieldOfStudy;
        if (string.IsNullOrEmpty(contentToIndex))
        {
            return;
        }
        var processedContent = GetWordsCount(TextSplitter.TextNormalization(contentToIndex));
        var wordsToDelete = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        await _resumeIndexingCommandRepository.DeleteProcessedResumeWordsByResumeId(education.ResumeId, wordsToDelete);
        await IndexEducationContent(education);
    }

    public async Task DeleteIndexedEducationContent(Education education)
    {
        var contentToIndex = education.FieldOfStudy;
        if (string.IsNullOrEmpty(contentToIndex))
        {
            return;
        }
        var processedContent = GetWordsCount(TextSplitter.TextNormalization(contentToIndex));
        var wordsToDelete = processedContent.Select(keyValuePair => keyValuePair.Key).ToList();
        await _resumeIndexingCommandRepository.DeleteProcessedResumeWordsByResumeId(education.ResumeId, wordsToDelete);
    }

    public async Task IndexWorkExperienceContent(WorkExperience workExperience)
    {
        throw new NotImplementedException();
    }

    public async Task IndexSkill(Skill skill)
    {
        throw new NotImplementedException();
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
}