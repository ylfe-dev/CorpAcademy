using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Features.Shared.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.Categories;

internal class MongoCategoriesClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<CategoryEntity>(mongoClientProvider), ICategoriesClient
{
    public async Task CreateCategory(string name, string icon, Guid userId) =>
        await Insert(
            new CategoryEntity(
                Guid.NewGuid(),
                userId,
                name,
                icon));

    public async Task<List<Category>> GetCategories(Guid userId) =>
        await Table
            .Where(x => !x.UserId.HasValue || x.UserId.Value == userId)
            .Select(x => new Category(x.Id, x.Name, x.Icon))
            .ToListAsync();

    public async Task<Category> GetCategory(Guid categoryId, Guid userId) =>
        await Table
            .Where(x => x.Id == categoryId && (!x.UserId.HasValue || x.UserId == userId))
            .Select(x => new Category(x.Id, x.Name, x.Icon))
            .FirstOrDefaultAsync();

    public async Task<bool> Exists(string categoryName, Guid userId) =>
        await Exists(x => x.Name == categoryName && (!x.UserId.HasValue || x.UserId == userId));

    public async Task<bool> Exists(Guid categoryId) => await Exists(x => x.Id == categoryId);

    public async Task DeleteCategory(string categoryName, Guid userId) =>
        await Collection.DeleteOneAsync(
            Builders<CategoryEntity>.Filter.And(
                NameFilter(categoryName),
                UserIdFilter(userId)));

    private static FilterDefinition<CategoryEntity> NameFilter(string name) =>
        Builders<CategoryEntity>.Filter.Eq(x => x.Name, name);

    private static FilterDefinition<CategoryEntity> UserIdFilter(Guid userId) =>
        Builders<CategoryEntity>.Filter.Eq(x => x.UserId, userId);
}
