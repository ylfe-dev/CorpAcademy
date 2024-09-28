namespace CorporationAcademy.Features.Shared.Models;

public record Category(
    Guid Id,
    string Name,
    string Icon,
    bool IsUserDefinedCategory);