using CorporationAcademy.Features.GenerateSentences.Models;

namespace CorporationAcademy.Features.GenerateSentences.Clients;

public interface ISentencesGenerator
{
    Task<List<Sentence>> Generate(List<string> bannedWords);
}
