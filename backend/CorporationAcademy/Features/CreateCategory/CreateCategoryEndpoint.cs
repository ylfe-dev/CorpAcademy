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
                [FromHeader] bool isAdmin,
                ICategoriesClient categoriesClient,
                IUserAccessor userAccessor,
                IEmojiGenerator emojiGenerator) =>
            {
                if (!isAdmin)
                {
                    userAccessor.ThrowIfNotAuthenticated();
                }

                Guid? userId = isAdmin ? null : userAccessor.UserId;

                if (await categoriesClient.Exists(request.Name, userId))
                {
                    return Results.BadRequest("Category already exists.");
                }

                var icon = await emojiGenerator.Generate(request.Name);

                await categoriesClient.CreateCategory(request.Name, icon, userId);
                return Results.Ok();
            });
    }
}
