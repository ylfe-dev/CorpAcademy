using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Infrastructure.OpenAi.DataStructures;
using OpenAI.Chat;
using System.Text.Json;

namespace CorporationAcademy.Infrastructure.OpenAi;

internal class OpenAiSentencesGenerator : ISentencesGenerator
{
    public async Task<GeneratedSentences> Generate(
        List<string> learningWords,
        string sourceLanguage,
        string targetLanguage,
        string topic)
    {
        ChatClient client = new("gpt-4o-mini", Environment.GetEnvironmentVariable("OpenAi_Key"));

        ChatCompletion chatCompletion = await client.CompleteChatAsync(
        [
            new UserChatMessage(
                GetPrompt(sourceLanguage, targetLanguage, topic, learningWords)
                ),
        ]);

        string? content = chatCompletion.Content.ToString();

        GeneratedSentences? result = JsonSerializer.Deserialize<GeneratedSentences>(content);

        if (result == null)
            throw new Exception("Failed to deserialize generated sentences");

        return result;
    }

    private string GetPrompt(
        string sourceLanguage,
        string targetLanguage,
        string topic,
        List<string> wordsToLearn
        )
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

            Odpowiedź zwróć w formacie JSON. Format:
            ```
            {
                "Sentences": [
                {
                    "Content": "[treść zdania]",
                    "WordsToAsk": [
                    {
                        "TargetLanguage": "[słowo w języku '{{targetLanguage}}', które znajduje się w tym zdaniu]",
                        "NativeLanguage": "[tłumaczenie słowa na język '{{sourceLanguage}}']"
                    },
                    {
                        "TargetLanguage": "[słowo w języku '{{targetLanguage}}', które znajduje się w tym zdaniu]",
                        "NativeLanguage": "[tłumaczenie słowa na język '{{sourceLanguage}}']"
                    }
                    ]
                }
                ]
            }
            ```
            """;
    }
}
