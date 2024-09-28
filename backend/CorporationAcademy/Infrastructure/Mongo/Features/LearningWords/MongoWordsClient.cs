﻿using CorporationAcademy.Features.Shared.Clients;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;

internal class MongoWordsClient(IMongoClientProvider mongoClientProvider) : MongoTableBase<LearningWord>(mongoClientProvider), IWordsClient
{
    public async Task DeleteLearningWord(Guid userId, Guid categoryId, string learningWord) =>
        await Collection.DeleteOneAsync(
            Builders<LearningWord>.Filter.And(
                UserIdFilter(userId),
                CategoryIdFilter(categoryId),
                WordFilter(learningWord)));

    public async Task<List<string>> GetLearningWords(Guid userId, Guid categoryId) =>
        await Table
            .Where(e => e.UserId == userId || e.CategoryId == categoryId)
            .Select(x => x.Word)
            .ToListAsync();

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
        Builders<LearningWord>.Filter.Eq(x => x.Id, categoryId);

    private static FilterDefinition<LearningWord> UserIdFilter(Guid userId) =>
        Builders<LearningWord>.Filter.Eq(x => x.UserId, userId);

    private static FilterDefinition<LearningWord> WordFilter(string learningWord) =>
        Builders<LearningWord>.Filter.Eq(x => x.Word, learningWord);
}
