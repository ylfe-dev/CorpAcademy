namespace CorporationAcademy.Infrastructure.OpenAi.DataStructures;

public class GeneratedSentence
{
    public string Content { get; set; }
    public List<GeneratedWord> WordsToAsk { get; set; }
}