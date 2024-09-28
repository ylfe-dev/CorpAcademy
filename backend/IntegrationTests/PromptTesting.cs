using CorporationAcademy.Infrastructure.OpenAi;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace IntegrationTests;

public class PromptTesting
{
    private IConfiguration _configuration;

    public PromptTesting()
    {
        var builder = new ConfigurationBuilder()
            .AddUserSecrets<PromptTesting>();

        _configuration = builder.Build();
    }

    [Fact]
    public async Task RunOpenAiSentenceGenerationAsync()
    {
        var generator = new OpenAiSentencesGenerator(new ChatCompletionService(_configuration));

        var result = await generator.Generate(
            new List<string> { "dog", "cat", "bird" },
            sourceLanguage: "Polish",
            targetLanguage: "English",
            topic: "Animals",
            level: 5
        );

        Console.WriteLine(JsonSerializer.Serialize(result));
    }

    [Fact]
    public async Task RunOpenAiEmojiGeneratorAsync()
    {
        var generator = new OpenAiEmojiGenerator(new ChatCompletionService(_configuration));

        var result = await generator.Generate("Beer");

        Console.WriteLine(result);
    }
}