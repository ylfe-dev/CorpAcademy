using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using System.Linq;

namespace CorporationAcademy.Features.GetCategories;

public static class GetCategoriesEndpoint
{
    private record CategoryDetails(Guid Id, string Name, string Icon, int NumberOfLearningWords, int CurrentLevel);

    private record GetCategoriesResponse(List<CategoryDetails> Categories);

    public static void MapGetCategoriesEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/categories",
            async (
                ICategoriesClient categoriesClient,
                IUserAccessor userAccessor,
                IWordsClient wordsClient,
                IExperiencesClient experiencesClient,
                ILevelCalculator levelCalculator) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                var categories = await categoriesClient.GetCategories(userAccessor.UserId);
                var categoryIds = categories.Select(x => x.Id).ToHashSet();
                var categoryLearningWords = await wordsClient.GetNumberOfLearningWords(
                    userAccessor.UserId,
                    categoryIds);

                var experience = await experiencesClient.GetUserExperience(
                    userAccessor.UserId,
                    categoryIds);

                var levels = experience
                    .ToDictionary(x => x.Key, x => levelCalculator.CalculateLevel(x.Value));

                var result = categories
                    .Select(x => new CategoryDetails(
                        x.Id,
                        x.Name,
                        x.Icon,
                        categoryLearningWords.TryGetValue(x.Id, out var count) ? count : 0,
                        levels.TryGetValue(x.Id, out var level) ? level : 1))
                    .ToList();

                return Results.Ok(new GetCategoriesResponse(result));
            });
    }
}
