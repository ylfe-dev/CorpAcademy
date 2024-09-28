using CorporationAcademy.Features.Shared.Clients;
using MongoDB.Driver.Linq;
namespace CorporationAcademy.Infrastructure.Mongo.Features.Categories;

internal class MongoCategoriesClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<Category>(mongoClientProvider), ICategoriesClient
{
    public async Task<bool> Exists(Guid categoryId) => await Table.AnyAsync(x => x.Id == categoryId);
}
