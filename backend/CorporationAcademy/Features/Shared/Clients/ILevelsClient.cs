namespace CorporationAcademy.Features.Shared.Clients;

public interface ILevelsClient
{
    Task<int> GetUserExperience(Guid userId, Guid categoryId);
    Task IncreaseUserExperience(Guid userId, Guid categoryId, int valueToAdd);
}
