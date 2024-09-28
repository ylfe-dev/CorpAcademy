namespace CorporationAcademy.Features.GenerateSentences.Models;

public record Sentence(
    string Content,
    List<Word> Words);
