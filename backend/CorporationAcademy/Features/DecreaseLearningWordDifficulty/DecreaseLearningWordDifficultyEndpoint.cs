using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.DeleteLearningWord;

public static class DecreaseLearningWordDifficultyEndpoint
{
    public static void MapDeleteLearningWordEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/decrease-learning-word-difficulty",
            async (
                [FromQuery] Guid categoryId,
                [FromQuery] string word,
                IWordsClient wordsClient,
                IUserAccessor userAccessor) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                await wordsClient.DecreaseLearningWordDifficulty(userAccessor.UserId, categoryId, word);

                return Results.Ok();
            });
    }
}
