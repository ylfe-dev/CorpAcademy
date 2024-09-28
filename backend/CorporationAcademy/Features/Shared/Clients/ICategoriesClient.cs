namespace CorporationAcademy.Features.Shared.Clients;

public interface ICategoriesClient
{
    Task<bool> Exists(Guid categoryId);
}
