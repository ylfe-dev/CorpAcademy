using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.GenerateSentences.Models;
using CorporationAcademy.Infrastructure.OpenAi.DataStructures;
using OpenAI.Chat;
using System.Text.Json;

namespace CorporationAcademy.Infrastructure.OpenAi;

public class OpenAiSentencesGenerator : ISentencesGenerator
{
    private readonly string _openAiKey;

    public OpenAiSentencesGenerator(IConfiguration configuration)
    {
        _openAiKey = configuration["OpenAI_Key"] ?? throw new ArgumentNullException("OpenAI_Key");
    }

    public async Task<List<Sentence>> Generate(
        List<string> learningWords,
        string sourceLanguage,
        string targetLanguage,
        string topic)
    {
        ChatClient client = new("gpt-4o-mini", _openAiKey);

        ChatCompletion chatCompletion = await client.CompleteChatAsync(
        [
            new UserChatMessage(
                GetPrompt(sourceLanguage, targetLanguage, topic, learningWords)
                ),
        ]);

        var content = chatCompletion.Content[0].Text;

        GeneratedSentences? result = JsonSerializer.Deserialize<GeneratedSentences>(content);

        if (result == null)
            throw new Exception("Failed to deserialize generated sentences");

        return result.Sentences;
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
                    "Content": "[treść zdania w języku '{{targetLanguage}}']",
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
            Zwróć tylko JSON, nie formatuj odpowiedzi używając Markdown.
            """;
    }
}