namespace CorporationAcademy.Features.GenerateSentences.Models;

public record Sentence(
    string Content,
    string TranslatedContent,
    List<Word> Words);
