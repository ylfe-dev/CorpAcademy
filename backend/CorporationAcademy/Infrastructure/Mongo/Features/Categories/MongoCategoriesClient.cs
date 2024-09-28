using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Features.Shared.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.Categories;

internal class MongoCategoriesClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<CategoryEntity>(mongoClientProvider), ICategoriesClient
{
    public async Task CreateCategory(string name, string icon, Guid? userId) =>
        await Insert(
            new CategoryEntity(
                Guid.NewGuid(),
                userId,
                name,
                icon));

    public async Task<List<Category>> GetCategories(Guid userId) =>
        await Table
            .Where(x => !x.UserId.HasValue || x.UserId.Value == userId)
            .Select(x => new Category(x.Id, x.Name, x.Icon, x.UserId.HasValue))
            .ToListAsync();

    public async Task<Category> GetCategory(Guid categoryId, Guid userId) =>
        await Table
            .Where(x => x.Id == categoryId && (!x.UserId.HasValue || x.UserId == userId))
            .Select(x => new Category(x.Id, x.Name, x.Icon, x.UserId.HasValue))
            .FirstOrDefaultAsync();

    public async Task<bool> Exists(Guid categoryId, Guid userId) =>
        await Exists(x => x.Id == categoryId && (!x.UserId.HasValue || x.UserId == userId));

    public async Task<bool> Exists(string categoryName, Guid? userId) =>
        await Exists(x => x.Name == categoryName && (!x.UserId.HasValue || x.UserId == userId));

    public async Task<bool> Exists(Guid categoryId) => await Exists(x => x.Id == categoryId);

    public async Task DeleteCategory(Guid categoryId, Guid userId) =>
        await Collection.DeleteOneAsync(
            Builders<CategoryEntity>.Filter.And(
                IdFilter(categoryId),
                UserIdFilter(userId)));

    private static FilterDefinition<CategoryEntity> IdFilter(Guid categoryId) =>
        Builders<CategoryEntity>.Filter.Eq(x => x.Id, categoryId);

    private static FilterDefinition<CategoryEntity> UserIdFilter(Guid userId) =>
        Builders<CategoryEntity>.Filter.Eq(x => x.UserId, userId);
}
