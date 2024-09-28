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
        var generator = new OpenAiSentencesGenerator(_configuration);

        var result = await generator.Generate(
            new List<string> { "dog", "cat", "bird" },
            sourceLanguage: "Polish",
            targetLanguage: "English",
            topic: "Animals"
        );

        Console.WriteLine(JsonSerializer.Serialize(result));
    }
}