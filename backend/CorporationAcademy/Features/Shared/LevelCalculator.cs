namespace CorporationAcademy.Features.Shared;

internal interface ILevelCalculator
{
    int CalculateLevel(int experience);
}

internal class LevelCalculator : ILevelCalculator
{
    public int CalculateLevel(int experience) => experience / 100 + 1;
}
