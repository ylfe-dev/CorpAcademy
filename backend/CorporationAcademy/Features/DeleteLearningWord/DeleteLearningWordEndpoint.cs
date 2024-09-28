using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.DeleteLearningWord;

public static class DeleteLearningWordEndpoint
{
    public static void MapDeleteLearningWordEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapDelete(
            "/api/learning-word",
            async (
                [FromQuery] Guid categoryId,
                [FromQuery] string word,
                IWordsClient wordsClient,
                IUserAccessor userAccessor) =>
            {
                userAccessor.ThrowIfNotAuthenticated();

                await wordsClient.DeleteLearningWord(userAccessor.UserId, categoryId, word);

                return Results.Ok();
            });
    }
}
