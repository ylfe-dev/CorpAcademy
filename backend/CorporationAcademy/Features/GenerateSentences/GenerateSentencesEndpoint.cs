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
                [FromQuery] string categoryName,
                IUserAccessor userAccessor,
                ISentencesGenerator sentencesGenerator,
                IWordsClient wordsClient) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                var learningWords = await wordsClient.GetLearningWords(userAccessor.UserId);
                var sentences = await sentencesGenerator.Generate(
                    learningWords,
                    "polski",
                    "angielski",
                    categoryName);

                return Results.Ok(new GenerateSentencesResponse(sentences));
            });
    }
}
