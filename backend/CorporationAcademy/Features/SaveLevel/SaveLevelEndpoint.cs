using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.SaveLevel;

public static class SaveLevelEndpoint
{
    private record SaveLevelRequest(Guid CategoryId, int Experience);

    public static void MapSaveLevelEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/level",
            async (
                [FromBody] SaveLevelRequest request,
                IUserAccessor userAccessor,
                IExperiencesClient experiencesClient,
                ICategoriesClient categoriesClient) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                if (!await categoriesClient.Exists(request.CategoryId, userAccessor.UserId))
                {
                    return Results.BadRequest("Category do not exists");
                }

                await experiencesClient.IncreaseUserExperience(userAccessor.UserId, request.CategoryId, request.Experience);
                return Results.Ok();
            });
    }
}
