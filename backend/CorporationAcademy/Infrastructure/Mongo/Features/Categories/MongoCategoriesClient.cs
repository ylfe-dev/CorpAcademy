using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Features.Shared.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.Categories;

internal class MongoCategoriesClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<CategoryEntity>(mongoClientProvider), ICategoriesClient
{
    public async Task CreateCategory(string name, string icon) =>
        await Insert(
            new CategoryEntity(
                Guid.NewGuid(),
                name,
                icon));

    public async Task<List<Category>> GetCategories() =>
        await Table
            .Select(x => new Category(x.Id, x.Name, x.Icon))
            .ToListAsync();

    public async Task<bool> Exists(string categoryName) => await Exists(x => x.Name == categoryName);

    public async Task<bool> Exists(Guid categoryId) => await Exists(x => x.Id == categoryId);
}
