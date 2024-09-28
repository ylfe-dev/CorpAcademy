using CorporationAcademy.Infrastructure.Mongo.Features.LearningWords;
using OpenAI.Chat;

namespace CorporationAcademy.Infrastructure.OpenAi;

internal interface IChatCompletionService
{
    Task<string> CompleteChat(ChatMessage[] messages);
}

internal class ChatCompletionService(IConfiguration configuration) : IChatCompletionService
{
    private readonly string _openAiKey = configuration["OpenAi_Key"]
        ?? throw new ArgumentNullException("OpenAi_Key");

    public async Task<string> CompleteChat(ChatMessage[] messages)
    {
        var client = new ChatClient("gpt-4o-mini", _openAiKey);

        var chatCompletion = await client.CompleteChatAsync(messages);

        return chatCompletion?.Value?.Content?.ToString()
            ?? throw new ArgumentNullException("Body from openai");
    }
}
