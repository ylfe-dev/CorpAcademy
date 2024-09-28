using CorporationAcademy.Features.CreateCategory.Clients;
using OpenAI.Chat;

namespace CorporationAcademy.Infrastructure.OpenAi;

internal class OpenAiIEmojiGenerator(IChatCompletionService chatCompletionService) : IEmojiGenerator
{
    public async Task<string> Generate(string categoryName)
    {
        return await chatCompletionService.CompleteChat(
        [
            new UserChatMessage(GetPrompt(categoryName))
        ]);
    }

    private static string GetPrompt(string categoryName) => @$"
Wygeneruj mi emotikonę w formacie utf-8 dla słów z kategorii '{categoryName}'.
Zwróć tylko jedną emotikonę.
";
}
