using CorporationAcademy.Features.Shared.Clients;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.Levels;

internal class MongoLevelsClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<UserCategoryLevelEntity>(mongoClientProvider), ILevelsClient
{
    public async Task<int> GetUserExperience(Guid userId, Guid categoryId) =>
        await Table
            .Where(x => x.UserId == userId && x.CategoryId == categoryId)
            .Select(x => x.Experience)
            .SingleOrDefaultAsync();

    public async Task IncreaseUserExperience(Guid userId, Guid categoryId, int valueToAdd)
    {
        var existingEntity = await Table
            .Where(x => x.UserId == userId && x.CategoryId == categoryId)
            .FirstOrDefaultAsync();

        if (existingEntity is null)
        {
            await Insert(
                new UserCategoryLevelEntity(
                    Guid.NewGuid(),
                    userId,
                    categoryId,
                    valueToAdd));
        }
        else
        {
            var updatedEntity = existingEntity with
            {
                Experience = existingEntity.Experience + valueToAdd
            };

            await Update(
                updatedEntity,
                x => x.Id,
                x => x.Experience);
        }
    }
}
