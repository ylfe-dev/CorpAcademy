namespace CorporationAcademy.Features.CreateCategory.Clients;

public interface IEmojiGenerator
{
    Task<string> Generate(string categoryName);
}
