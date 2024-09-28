namespace CorporationAcademy.Features.Shared.Clients;

public interface IWordsClient
{
    Task SaveLearningWord(Guid userId, Guid categoryId, string learningWord);
    Task<List<string>> GetLearningWords(Guid userId, Guid categoryId);
    Task<Dictionary<Guid, int>> GetNumberOfLearningWords(Guid userId, HashSet<Guid> categoryIds);
    Task DeleteLearningWord(Guid userId, Guid categoryId, string learningWord);
}
