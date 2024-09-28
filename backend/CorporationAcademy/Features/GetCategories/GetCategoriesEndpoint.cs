using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;

namespace CorporationAcademy.Features.GetCategories;

public static class GetCategoriesEndpoint
{
    private record CategoryDetails(Guid Id, string Name, string Icon, int NumberOfLearningWords);

    private record GetCategoriesResponse(List<CategoryDetails> Categories);

    public static void MapGetCategoriesEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/categories",
            async (ICategoriesClient categoriesClient, IUserAccessor userAccessor, IWordsClient wordsClient) =>
            {
                var categories = await categoriesClient.GetCategories(userAccessor.UserId);
                var categoryLearningWords = await wordsClient.GetNumberOfLearningWords(
                    userAccessor.UserId,
                    categories.Select(x => x.Id).ToHashSet());

                var result = categories
                    .Select(x => new CategoryDetails(
                        x.Id,
                        x.Name,
                        x.Icon,
                        categoryLearningWords.TryGetValue(x.Id, out var count) ? count : 0))
                    .ToList();

                return Results.Ok(new GetCategoriesResponse(result));
            });
    }
}
