using CorporationAcademy.Features.GenerateSentences.Models;

namespace CorporationAcademy.Infrastructure.OpenAi.DataStructures;

public record GeneratedSentences(List<Sentence> Sentences);