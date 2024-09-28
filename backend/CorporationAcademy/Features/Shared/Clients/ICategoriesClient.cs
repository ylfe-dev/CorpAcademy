using CorporationAcademy.Features.Shared.Models;

namespace CorporationAcademy.Features.Shared.Clients;

public interface ICategoriesClient
{
    Task<bool> Exists(Guid categoryId);
    Task<bool> Exists(string categoryName);
    Task<List<Category>> GetCategories(Guid userId);
    Task CreateCategory(string name, string icon, Guid userId);
}
