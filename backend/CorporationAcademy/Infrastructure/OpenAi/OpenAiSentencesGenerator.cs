using CorporationAcademy.Features.GenerateSentences.Clients;
using CorporationAcademy.Features.GenerateSentences.Models;

namespace CorporationAcademy.Infrastructure.OpenAi;

internal class OpenAiSentencesGenerator : ISentencesGenerator
{
    public Task<List<Sentence>> Generate(List<string> bannedWords)
    {
        throw new NotImplementedException();
    }
}
