using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.GenerateSentences.Models;
using CorporationAcademy.Features.Shared;
using CorporationAcademy.Features.Shared.Clients;
using Microsoft.AspNetCore.Mvc;

namespace CorporationAcademy.Features.GenerateSentences;

public static class GenerateSentencesEndpoint
{
    public record Response(List<Sentence> Sentences);

    public static void MapGenerateSentencesEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapGet(
            "/api/generate-sentences",
            async (
                [FromQuery]
                string categoryName,
                IUserAccessor userAccessor,
                ISentencesGenerator sentencesGenerator,
                IWordsClient wordsClient) =>
            {
                var learningWords = await wordsClient.GetLearningWords(userAccessor.UserId);
                var sentences = await sentencesGenerator.Generate(
                    learningWords,
                    "polski",
                    "angielski",
                    categoryName
                    );

                var convertedSentences = sentences.Sentences.Select(sentence =>
                    new Sentence(
                        sentence.Content,
                        sentence.WordsToAsk.Select(word =>
                            new Word(
                                word.NativeLanguage,
                                word.TargetLanguage
                            )).ToList()
                    )).ToList();

                return Results.Ok(new Response(convertedSentences));
            });
    }
}
