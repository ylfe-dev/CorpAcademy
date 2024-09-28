namespace CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;

internal record LearningWord(
    Guid Id,
    Guid UserId,
    Guid CategoryId,
    string Word,
    int NumberOfMistakes);
