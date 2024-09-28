using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.CreateCategory;

public static class CreateCategoryEndpoint
{
    private record CreateCategoryRequest(string Name, string Icon);

    public static void MapCreateCategoryEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/categories",
            async (
                [FromBody] CreateCategoryRequest request,
                ICategoriesClient categoriesClient,
                IUserAccessor userAccessor) =>
            {
                if (await categoriesClient.Exists(request.Name))
                {
                    return Results.BadRequest("Category already exists.");
                }

                await categoriesClient.CreateCategory(request.Name, request.Icon, userAccessor.UserId);
                return Results.Ok();
            });
    }
}
