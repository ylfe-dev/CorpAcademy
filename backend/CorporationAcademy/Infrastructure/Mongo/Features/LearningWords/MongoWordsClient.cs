using CorporationAcademy.Features.Shared.Clients;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;

internal class MongoWordsClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<LearningWord>(mongoClientProvider), IWordsClient
{
    private Random _random = new();

    public async Task DecreaseLearningWordDifficulty(Guid userId, Guid categoryId, string learningWord)
    {
        var existingEntity = await Table
            .Where(x => x.UserId == userId
                && x.CategoryId == categoryId
                && x.Word == learningWord)
            .SingleAsync();

        if (existingEntity.NumberOfMistakes == 0)
        {
            await Collection.DeleteOneAsync(
                Builders<LearningWord>.Filter.And(
                    UserIdFilter(userId),
                    CategoryIdFilter(categoryId),
                    WordFilter(learningWord)));
        }
        else
        {
            var updatedEntity = existingEntity with
            {
                NumberOfMistakes = existingEntity.NumberOfMistakes - 1
            };

            await Update(
                updatedEntity,
                x => x.Id,
                x => x.NumberOfMistakes);
        }
    }

    public async Task<List<string>> GetLearningWords(Guid userId, Guid categoryId, int numberOfWords)
    {
        List<string> result = new();

        var allAvailableWords = await Table
            .Where(e => e.UserId == userId && e.CategoryId == categoryId)
            .ToListAsync();

        List<Guid> poolOfIdsToBeDrawn = new();
        foreach (var word in allAvailableWords)
        {
            for (int i = 0; i < word.NumberOfMistakes + 1; i++)
            {
                poolOfIdsToBeDrawn.Add(word.Id);
            }
        }

        while (result.Count() < numberOfWords && poolOfIdsToBeDrawn.Count() > 0)
        {
            var randomIndex = _random.Next(poolOfIdsToBeDrawn.Count);
            var randomId = poolOfIdsToBeDrawn[randomIndex];

            result.Add(
                allAvailableWords
                    .Where(x => x.Id == randomId)
                    .Single()
                    .Word
                );

            poolOfIdsToBeDrawn.RemoveAt(randomIndex);
        }

        return result;
    }

    public async Task<Dictionary<Guid, int>> GetNumberOfLearningWords(Guid userId, HashSet<Guid> categoryIds)
    {
        var query = await Table
            .Where(x => x.UserId == userId && categoryIds.Contains(x.CategoryId))
            .ToListAsync();

        return query
            .GroupBy(x => x.CategoryId)
            .ToDictionary(x => x.Key, x => x.Count());
    }

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

    private static FilterDefinition<LearningWord> CategoryIdFilter(Guid categoryId) =>
        Builders<LearningWord>.Filter.Eq(x => x.CategoryId, categoryId);

    private static FilterDefinition<LearningWord> UserIdFilter(Guid userId) =>
        Builders<LearningWord>.Filter.Eq(x => x.UserId, userId);

    private static FilterDefinition<LearningWord> WordFilter(string learningWord) =>
        Builders<LearningWord>.Filter.Eq(x => x.Word, learningWord);
}
