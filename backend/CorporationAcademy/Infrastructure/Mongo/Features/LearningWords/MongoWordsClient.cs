using CorporationAcademy.Features.Shared.Clients;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;

internal class MongoWordsClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<LearningWord>(mongoClientProvider), IWordsClient
{
    public async Task<List<string>> GetLearningWords(Guid userId) =>
        await Table
            .Where(e => e.UserId == userId)
            .Select(x => x.Word)
            .ToListAsync();

    public async Task SaveLearningWord(Guid userId, Guid categoryId, string learningWord)
    {
        var existingEntity = await Table
            .Where(x => x.UserId == userId
                && x.Word == learningWord
                && x.CategoryId == categoryId)
            .SingleOrDefaultAsync();

        if (existingEntity is null)
        {
            await Insert(
                new LearningWord(
                    Guid.NewGuid(),
                    userId,
                    categoryId,
                    learningWord,
                    0));
        }
        else
        {
            var updatedEntity = existingEntity with
            {
                NumberOfMistakes = existingEntity.NumberOfMistakes + 1
            };

            await Update(
                updatedEntity,
                x => x.Id,
                x => x.NumberOfMistakes);
        }

    }
}
