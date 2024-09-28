namespace CorporationAcademy.Features.Shared.Clients;

public interface IWordsClient
{
    Task SaveLearningWord(Guid userId, Guid categoryId, string learningWord);
    Task<List<string>> GetLearningWords(Guid userId);
}
