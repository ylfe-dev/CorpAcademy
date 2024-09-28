namespace CorporationAcademy.Infrastructure.Mongo.Features.Experience;

internal record UserExperienceEntity(
    Guid Id,
    Guid UserId,
    Guid CategoryId,
    int Experience);
