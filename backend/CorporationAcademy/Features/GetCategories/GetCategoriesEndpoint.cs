using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using CorporationAcademy.Features.Shared.Models;

namespace CorporationAcademy.Features.GetCategories;

public static class GetCategoriesEndpoint
{
    private record GetCategoriesResponse(List<Category> Categories);

    public static void MapGetCategoriesEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/categories",
            async (ICategoriesClient categoriesClient, IUserAccessor userAccessor) =>
            {
                var categories = await categoriesClient.GetCategories(userAccessor.UserId);
                return Results.Ok(new GetCategoriesResponse(categories));
            });
    }
}
