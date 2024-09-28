using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.GenerateSentences.Models;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.GenerateSentences;

public static class GenerateSentencesEndpoint
{
    private record GenerateSentencesResponse(List<Sentence> Sentences);

    public static void MapGenerateSentencesEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/generate-sentences",
            async (
                [FromQuery] Guid categoryId,
                IUserAccessor userAccessor,
                ISentencesGenerator sentencesGenerator,
                IWordsClient wordsClient,
                ICategoriesClient categoriesClient) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                var category = await categoriesClient.GetCategory(categoryId, userAccessor.UserId);

                if (category is null)
                {
                    return Results.NotFound();
                }

                var learningWords = await wordsClient.GetLearningWords(userAccessor.UserId, categoryId);
                var sentences = await sentencesGenerator.Generate(
                    learningWords,
                    "polski",
                    "angielski",
                    category.Name);

                return Results.Ok(new GenerateSentencesResponse(sentences));
            });
    }
}
