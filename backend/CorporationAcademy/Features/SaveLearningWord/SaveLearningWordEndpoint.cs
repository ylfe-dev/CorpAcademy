using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.SaveLearningWord;

public static class SaveLearningWordEndpoint
{
    public record Request(Guid CategoryId, string LearningWord);

    public static void MapSaveLearningWordEnpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/learning-word",
            async (
                [FromBody] Request request,
                IUserAccessor userAccessor,
                IWordsClient wordsClient,
                ICategoriesClient categoriesClient) =>
            {
                if (!await categoriesClient.Exists(request.CategoryId))
                {
                    return Results.BadRequest("Category do not exists");
                }

                await wordsClient.SaveLearningWord(userAccessor.UserId, request.CategoryId, request.LearningWord);
                return Results.Ok();
            });
    }
}
