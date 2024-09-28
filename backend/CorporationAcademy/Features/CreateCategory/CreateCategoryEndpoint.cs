using CorporationAcademy.Features.CreateCategory.Clients;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.CreateCategory;

public static class CreateCategoryEndpoint
{
    private record CreateCategoryRequest(string Name);

    public static void MapCreateCategoryEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/categories",
            async (
                [FromBody] CreateCategoryRequest request,
                ICategoriesClient categoriesClient,
                IUserAccessor userAccessor,
                IEmojiGenerator emojiGenerator) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                if (await categoriesClient.Exists(request.Name, userAccessor.UserId))
                {
                    return Results.BadRequest("Category already exists.");
                }

                var icon = await emojiGenerator.Generate(request.Name);

                await categoriesClient.CreateCategory(request.Name, icon, userAccessor.UserId);
                return Results.Ok();
            });
    }
}
