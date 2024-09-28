namespace CorporationAcademy.Infrastructure.Mongo.Features.Categories;

internal record CategoryEntity(
    Guid Id,
    Guid? UserId,
    string Name,
    string Icon);
