using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.DeleteCategory;

public static class DeleteCategoryEndpoint
{
    public static void MapDeleteCategoryEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapDelete(
            "/api/categories/{categoryId}",
            async (
                [FromRoute] Guid categoryId,
                ICategoriesClient categoriesClient,
                IUserAccessor userAccessor) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                if (!await categoriesClient.Exists(categoryId, userAccessor.UserId))
                {
                    return Results.NotFound();
                }

                await categoriesClient.DeleteCategory(categoryId, userAccessor.UserId);
                return Results.Ok();
            });
    }
}
