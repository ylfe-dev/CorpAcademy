using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.GenerateSentences.Models;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.GenerateSentences;

public static class GenerateSentencesEndpoint
{
    private record GenerateSentencesResponse(List<Sentence> Sentences);
    private const int NumberOfWordsInSingleLearningSession = 20;

    public static void MapGenerateSentencesEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/generate-sentences",
            async (
                [FromQuery] Guid categoryId,
                IUserAccessor userAccessor,
                ISentencesGenerator sentencesGenerator,
                IWordsClient wordsClient,
                ICategoriesClient categoriesClient,
                IExperiencesClient experiencesClient,
                ILevelCalculator levelCalculator,
                [FromQuery] string nativeLanguage = "polski",
                [FromQuery] string learningLanguage = "angielski") =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                var category = await categoriesClient.GetCategory(categoryId, userAccessor.UserId);

                if (category is null)
                {
                    return Results.NotFound();
                }

                var experience = await experiencesClient.GetUserExperience(userAccessor.UserId, categoryId);
                var level = levelCalculator.CalculateLevel(experience);

                var learningWords = await wordsClient.GetLearningWords(
                        userAccessor.UserId,
                        categoryId,
                        NumberOfWordsInSingleLearningSession
                    );

                var sentences = await sentencesGenerator.Generate(
                    learningWords,
                    nativeLanguage,
                    learningLanguage,
                    category.Name,
                    level);

                return Results.Ok(new GenerateSentencesResponse(sentences));
            });
    }
}
