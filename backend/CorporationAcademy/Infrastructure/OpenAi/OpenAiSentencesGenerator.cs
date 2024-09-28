using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.GenerateSentences.Models;
using CorporationAcademy.Infrastructure.OpenAi.DataStructures;
using OpenAI.Chat;
using System.Text.Json;

namespace CorporationAcademy.Infrastructure.OpenAi;

internal class OpenAiSentencesGenerator(IChatCompletionService chatCompletionService) : ISentencesGenerator
{
    public async Task<List<Sentence>> Generate(
        List<string> learningWords,
        string sourceLanguage,
        string targetLanguage,
        string topic,
        int level)
    {
        var content = await chatCompletionService.CompleteChat(
        [
            new UserChatMessage(GetPrompt(sourceLanguage, targetLanguage, topic, learningWords, level))
        ]);

        GeneratedSentences? result = JsonSerializer.Deserialize<GeneratedSentences>(content);

        if (result == null)
            throw new Exception("Failed to deserialize generated sentences");

        return result.Sentences;
    }

    private string GetPrompt(
        string sourceLanguage,
        string targetLanguage,
        string topic,
        List<string> wordsToLearn,
        int level)
    {
        var jsonObject = new
        {
            vocabulary = wordsToLearn
        };

        string jsonAsString = JsonSerializer.Serialize(jsonObject);

        return $$"""
            Zaproponuj zestaw zdań do nauki dla osoby uczącej się języka '{{targetLanguage}}'.
            Natywnym językiem tej osoby jest '{{sourceLanguage}}'.
            Uwzględniaj niżej wymienione słowa z planu nauki. 
            Tematyka: "{{topic}}". 
            Przy każdym zdaniu wypisz słowa z planu nauki, które się w nim znadują.
            Możesz też dodać dodatkowo słowa których nie ma w planie nauki, ale mogą być przydatne w nauce tego tematu.

            Słowa z planu nauki:
            ```
            {{jsonAsString}}
            ```

            W pięciostopniowej skali, trudność słow powinna być równa: {{level}}

            Odpowiedź zwróć w formacie JSON. Format:
            ```
            {
                "Sentences": [
                {
                    "Content": "[treść zdania w języku '{{targetLanguage}}']",
                    "Words": [
                    {
                        "LearnedLanguage": "[słowo w języku '{{targetLanguage}}', które znajduje się w tym zdaniu]",
                        "NativeLanguage": "[tłumaczenie słowa na język '{{sourceLanguage}}']"
                    },
                    {
                        "LearnedLanguage": "[słowo w języku '{{targetLanguage}}', które znajduje się w tym zdaniu]",
                        "NativeLanguage": "[tłumaczenie słowa na język '{{sourceLanguage}}']"
                    }
                    ]
                }
                ]
            }
            ```
            Zwróć tylko JSON, nie formatuj odpowiedzi używając Markdown.
            """;
    }
}