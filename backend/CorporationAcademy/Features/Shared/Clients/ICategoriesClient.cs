using CorporationAcademy.Features.Shared.Models;

namespace CorporationAcademy.Features.Shared.Clients;

public interface ICategoriesClient
{
    Task<bool> Exists(Guid categoryId);
    Task<bool> Exists(Guid categoryId, Guid userId);
    Task<bool> Exists(string categoryName, Guid? userId);
    Task<Category> GetCategory(Guid categoryId, Guid userId);
    Task<List<Category>> GetCategories(Guid userId);
    Task CreateCategory(string name, string icon, Guid? userId);
    Task DeleteCategory(Guid categoryId, Guid userId);
}
