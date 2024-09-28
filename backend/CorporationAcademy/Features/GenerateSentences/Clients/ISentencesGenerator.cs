using CorporationAcademy.Features.GenerateSentences.Models;
using CorporationAcademy.Infrastructure.OpenAi.DataStructures;

namespace CorporationAcademy.Features.GenerateSentences.Clients;

public interface ISentencesGenerator
{
    Task<GeneratedSentences> Generate(
        List<string> learningWords,
        string sourceLanguage,
        string targetLanguage,
        string topic);
}
