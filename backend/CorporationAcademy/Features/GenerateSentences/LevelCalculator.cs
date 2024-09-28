namespace CorporationAcademy.Features.GenerateSentences;

internal interface ILevelCalculator
{
    int CalculateLevel(int experience);
}

internal class LevelCalculator : ILevelCalculator
{
    public int CalculateLevel(int experience) => experience / 10 + 1;
}
