namespace CorporationAcademy.Features.Shared.Clients;

public interface IExperiencesClient
{
    Task<int> GetUserExperience(Guid userId, Guid categoryId);
    Task<Dictionary<Guid, int>> GetUserExperience(Guid userId, HashSet<Guid> categoryIds);
    Task IncreaseUserExperience(Guid userId, Guid categoryId, int valueToAdd);
}
