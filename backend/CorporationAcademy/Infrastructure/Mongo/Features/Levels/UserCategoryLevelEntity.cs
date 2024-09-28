namespace CorporationAcademy.Infrastructure.Mongo.Features.Levels;

internal record UserCategoryLevelEntity(
    Guid Id,
    Guid UserId,
    Guid CategoryId,
    int Experience);
