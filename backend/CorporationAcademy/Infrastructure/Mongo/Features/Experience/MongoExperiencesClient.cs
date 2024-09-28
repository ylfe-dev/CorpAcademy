using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Features.Shared.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.Experience;

internal class MongoExperiencesClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<UserExperienceEntity>(mongoClientProvider), IExperiencesClient
{
    public async Task<int> GetUserExperience(Guid userId, Guid categoryId) =>
        await Table
            .Where(x => x.UserId == userId && x.CategoryId == categoryId)
            .Select(x => x.Experience)
            .SingleOrDefaultAsync();

    public async Task<Dictionary<Guid, int>> GetUserExperience(Guid userId, HashSet<Guid> categoryIds)
    {
        var exps = await Table
            .Where(x => x.UserId == userId && categoryIds.Contains(x.CategoryId))
            .ToListAsync();

        return exps.ToDictionary(x => x.CategoryId, x => x.Experience);
    }

    public async Task IncreaseUserExperience(Guid userId, Guid categoryId, int valueToAdd)
    {
        var existingEntity = await Table
            .Where(x => x.UserId == userId && x.CategoryId == categoryId)
            .FirstOrDefaultAsync();

        if (existingEntity is null)
        {
            await Insert(
                new UserExperienceEntity(
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
